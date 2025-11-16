import { Injectable } from '@angular/core';
import { BggSqlMngrService } from 'bgg-sql-mngr';

export enum ProcessType {
  NONE = 0,
  BOX_CREATION = 1,
}

export function getProcessTypeName(type: ProcessType): string {
  return ProcessType[type] || "UNKNOWN_TYPE";
}

export enum ProcessStep {
  ABORTED_PROCESS = -1,
  NONE = 0,
  PROCESS_START = 1,
  GET_BARCODE = 2,
  GET_BGGID = 3,
  ASK_TITLE = 4,
  SEARCH_BGG_BY_TITLE = 5,
  CONFIRM_BGG_SELECTION = 6,
  GET_BGGINFO = 7
}
export function getProcessStepName(step: ProcessStep): string {
  return ProcessStep[step] || "UNKNOWN_STEP";
}

export enum PopupIdentifier {
  NONE = 0,
  BARCODE_INPUT = 1,
  TEXT_INPUT = 2,
  CHOICE_INPUT = 3,
}

export interface PopupData {
  visible_id: PopupIdentifier,
  viewtext: string[],
  varnames: string[],
  options: {val:any,opt:string}[],
  step_success: ProcessStep,
}

export interface _ProcessEnv_t{
    popups: PopupData,
    hidden_input_active:boolean,
    process:ProcessType,
    step:ProcessStep,
    ProcessData:Map<string, any>;
}

export const ProcessEnv:_ProcessEnv_t={
    popups: {
      visible_id: PopupIdentifier.NONE,
      viewtext: [],
      varnames: [],
      options: [],
      step_success: ProcessStep.NONE,
    },
    hidden_input_active:false,
    process:ProcessType.NONE,
    step:ProcessStep.PROCESS_START,
    ProcessData:new Map<string, any>()
};

@Injectable({
  providedIn: 'root',
})

export class ProcessManagerService {
  constructor(private sql: BggSqlMngrService) {}

  //utility functions
  //refocus hidden input
  hidden_input_refocus():void{
    if(ProcessEnv.hidden_input_active){
      console.log("Refocusing hidden input");
      ProcessEnv.hidden_input_active = false;
      setTimeout(() => {
        ProcessEnv.hidden_input_active = true;
      }, 100);
    }
  }

  showPopup(popup_id:PopupIdentifier, viewtext:string[], varnames:string[], options:{val:any,opt:string}[],step_success:ProcessStep):void{
    ProcessEnv.popups.viewtext = viewtext;
    ProcessEnv.popups.varnames = varnames;
    ProcessEnv.popups.options = options;
    ProcessEnv.popups.step_success = step_success;
    ProcessEnv.popups.visible_id = popup_id;
    ProcessEnv.hidden_input_active = true;
  }

  hidePopup():void{
    ProcessEnv.popups.visible_id = PopupIdentifier.NONE;
    ProcessEnv.popups.viewtext = [];
    ProcessEnv.popups.varnames = [];
    ProcessEnv.popups.options = [];
    ProcessEnv.popups.step_success = ProcessStep.NONE;
    ProcessEnv.hidden_input_active = false;;
  }

  storeData(key:string, value:any):void{
    ProcessEnv.ProcessData.set(key, value);
  }

  setNextStep(step:ProcessStep):void{
    ProcessEnv.step = step;
  }

  abort(message:string):void{
    ProcessEnv.step = ProcessStep.ABORTED_PROCESS;
    ProcessEnv.ProcessData.set("message", message);
    this.nextStep();
  }

  //process funcionts
  start_process(type:ProcessType){
    ProcessEnv.ProcessData.clear();
    ProcessEnv.process = type;
    ProcessEnv.step = ProcessStep.PROCESS_START;
    this.nextStep();
  }

  async nextStep(){
    var go_again=false;
    var n_self=0;
    while(true){
      n_self++;
      go_again=false;
      var type:ProcessType = ProcessEnv.process;
      var step:ProcessStep = ProcessEnv.step;
      var data:Map<string, any> = ProcessEnv.ProcessData;
      if(step==ProcessStep.PROCESS_START){
        console.log("/*************/");
        console.log("STARTING PROCESS :",getProcessTypeName(type));
      }
      else{
        console.log("=> ",getProcessStepName(step));
      }
      //console.log(data);
      if(step==ProcessStep.NONE || type==ProcessType.NONE){
        console.log("ProcessManagerService.nextStep: ERROR");
        return;
      }
      else if(step==ProcessStep.ABORTED_PROCESS){
        console.log("ProcessManagerService.nextStep: Process Aborted due to", data.get("message"));
        return;
      }
      else{
        switch(type){
          case ProcessType.BOX_CREATION:
            switch(step){
              case ProcessStep.PROCESS_START: //OK
                ProcessEnv.step = ProcessStep.GET_BARCODE;
                go_again=true;
                break;
              case ProcessStep.GET_BARCODE://OK
                //proceed to receive barcode
                this.showPopup(PopupIdentifier.BARCODE_INPUT,[],["barcode"],[],ProcessStep.GET_BGGID);
                break;
              case ProcessStep.GET_BGGID:
                var sqldata= await this.sql.barcode_to_bggid(data.get("barcode"));
                if(sqldata.lines==0){
                  ProcessEnv.step = ProcessStep.ASK_TITLE;
                  go_again=true;
                }
                else if(sqldata.lines==1){
                  data.set("bgg_id", sqldata.id);
                  ProcessEnv.step = ProcessStep.GET_BGGINFO;
                  go_again=true;
                }
                else{
                  this.abort("Multiple BGG IDs found for this barcode");
                  return;
                }
                break;
              case ProcessStep.ASK_TITLE:
                this.showPopup(PopupIdentifier.TEXT_INPUT,["Game Title :"],["search_title"],[],ProcessStep.SEARCH_BGG_BY_TITLE);
                break;
              case ProcessStep.SEARCH_BGG_BY_TITLE:
                var searchresults= await this.sql.search_bgg_by_title(data.get("search_title"));
                if(searchresults.length==0){
                  this.abort("No results found for title search");
                  return;
                }
                else if (searchresults.length==1){
                  data.set("bgg_id", searchresults[0].bgg_id);
                  this.sql.store_barcode(data.get("barcode"), searchresults[0].bgg_id);
                  ProcessEnv.step = ProcessStep.GET_BGGINFO;
                  //Store both locally and remote
                  go_again=true;
                }
                else{
                  var options:{val:number,opt:string}[]=searchresults.map((x)=>{return {val:x.bgg_id,opt:x.bgg_name + " (" + x.bgg_year + ")"};});
                  this.showPopup(PopupIdentifier.CHOICE_INPUT,["Select the correct game :"],["bgg_id"],options,ProcessStep.CONFIRM_BGG_SELECTION);
                }
                break;
              case ProcessStep.CONFIRM_BGG_SELECTION:
                this.sql.store_barcode(data.get("barcode"), data.get("bgg_id"));
                ProcessEnv.step = ProcessStep.GET_BGGINFO;
                go_again=true;
                break;
              default:
                console.log("ProcessManagerService.nextStep: Reached unknown state :",getProcessTypeName(type),":",getProcessStepName(step));
                console.log(ProcessEnv);
            }
            break;
          default:
            console.log("ProcessManagerService.nextStep: Reached unknown state :",getProcessTypeName(type),":",getProcessStepName(step));
            console.log(ProcessEnv);
        }
      }
      if(!go_again) break;
      if(n_self>20){
        console.log("ProcessManagerService.nextStep: ERROR - too many iterations");
        break;
      }
    }
    return;
  }



}
