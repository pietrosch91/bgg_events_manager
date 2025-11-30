import { Injectable } from '@angular/core';
import { BARCODES, BGG, BGG_DB, BggBox, BggInfo, BggSqlMngrService, EV_BOXES, getSourceName, http_utils, Option_t, OWNERS, SourceID } from 'bgg-sql-mngr';

export enum ProcessType {
  NONE = 0,
  BOX_CREATION = 1,
  BOX_GROUP_ASSIGN = 2,
}

export function getProcessTypeName(type: ProcessType): string {
  return ProcessType[type] || "UNKNOWN_TYPE";
}

export function getProcessTypeNames(): string[] {
  return Object.keys(ProcessType)
    .filter(key => isNaN(Number(key)) && key !== 'NONE');
}

export function getProcessTypeByName(name: string): ProcessType {
  return (ProcessType as any)[name] ?? ProcessType.NONE;
}

export enum AutoInputType {
    PROCESS,
    BARCODE,
    OWNER,
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
  GET_BGGINFO = 7,
  SET_BGG_INFO = 8,
  GET_OWNER = 9,
  ADD_OWNER = 10,
  END_PROCESS = -99,
  CREATE_OWNER = 11,
  CREATE_GROUP = 12,
  SET_GROUP = 13,
  SYNC_GROUP = 14,
}

export function getProcessStepName(step: ProcessStep): string {
  return ProcessStep[step] || "UNKNOWN_STEP";
}

export enum PopupIdentifier {
  NONE = 0,
  BARCODE_INPUT = 1,
  TEXT_INPUT = 2,
  CHOICE_INPUT = 3,
  CHOICE_CREATE_INPUT,
}

export interface PopupData {
  visible_id: PopupIdentifier,
  viewtext: string[],
  varnames: string[],
  options: Option_t[],
  steps: ProcessStep[],
}

export interface AutoProcessData_t{
  auto_process?: ProcessType,
  auto_barcode?: string,
  auto_owner?: string,
}
export interface ProcessData_t{
  title_show?: string;
  message? : string,
  barcode? : string,
  bgg_id? : number,
  bgg_id_source? : SourceID,
  search_title? : string,
  bgg_info? : BggInfo,
  bgg_info_source? : SourceID,
  selected_owner? : string,
  new_owner? : string,
  box? : BggBox,
  selected_group? : number,
  new_group_name? : string,
}
export interface _ProcessEnv_t{
    popups: PopupData,
    hidden_input_active:boolean,
    process:ProcessType,
    step:ProcessStep,
    ProcessData:ProcessData_t;
    AutoProcessData:AutoProcessData_t;
    allow_auto_start:boolean,
    process_is_auto: boolean,
}

export const ProcessEnv:_ProcessEnv_t={
    popups: {
      visible_id: PopupIdentifier.NONE,
      viewtext: [],
      varnames: [],
      options: [],
      steps: [],
    },
    hidden_input_active:false,
    process:ProcessType.NONE,
    step:ProcessStep.PROCESS_START,
    ProcessData:{},
    AutoProcessData:{},
    allow_auto_start:true,
    process_is_auto: false,
};

@Injectable({
  providedIn: 'root',
})

export class ProcessManagerService {
  constructor(private sql: BggSqlMngrService) {}

  PD:ProcessData_t=ProcessEnv.ProcessData;

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

  showPopup(popup_id:PopupIdentifier, viewtext:string[], varnames:string[], options:Option_t[],steps:ProcessStep[]):void{
    if(ProcessEnv.process_is_auto){
      console.log("Attempting AutoFill");
      //try to check if the variable[0] is already set
      let varname=varnames[0];
      console.log(varname);
      let autovarname="auto_"+varname;
      console.log(autovarname);
      let autovalue=(ProcessEnv.AutoProcessData as any)[autovarname];
      console.log(autovalue);
      if(autovalue != undefined){
        console.log("Auto-filling popup input for ", PopupIdentifier[popup_id], " with value from ", autovarname);
        (this.PD as any)[varname]=autovalue;
        //proceed to next step
        let nextstep=steps[0];
        console.log("Proceeding to next step :", getProcessStepName(nextstep));
        this.setNextStep(nextstep);
        this.nextStep();
        return;
      }
    }
    ProcessEnv.popups.viewtext = viewtext;
    ProcessEnv.popups.varnames = varnames;
    ProcessEnv.popups.options = options;
    ProcessEnv.popups.steps = steps;
    ProcessEnv.popups.visible_id = popup_id;
    ProcessEnv.hidden_input_active = true;
  }

  hidePopup():void{
    ProcessEnv.popups.visible_id = PopupIdentifier.NONE;
    ProcessEnv.popups.viewtext = [];
    ProcessEnv.popups.varnames = [];
    ProcessEnv.popups.options = [];
    ProcessEnv.popups.steps=[];
    ProcessEnv.hidden_input_active = false;;
  }


  setNextStep(step:ProcessStep):void{
    ProcessEnv.step = step;
  }

  abort(message:string):void{
    ProcessEnv.step = ProcessStep.ABORTED_PROCESS;
    this.PD.message=message;
    this.nextStep();
  }

  //process funcionts
  start_process(type:ProcessType){
    ProcessEnv.process_is_auto = false;
    this.PD={}
    ProcessEnv.process = type;
    ProcessEnv.step = ProcessStep.PROCESS_START;
    this.nextStep();
  }

  start_box_process(type:ProcessType,box:BggBox){
    ProcessEnv.process_is_auto = false;
    this.PD={}
    this.PD.box=box;
    ProcessEnv.process = type;
    ProcessEnv.step = ProcessStep.PROCESS_START;
    this.nextStep();
  }

  autostart(){
    if(ProcessEnv.allow_auto_start){
      var type:ProcessType=ProcessEnv.AutoProcessData.auto_process!;
      if(type!==undefined && type!=ProcessType.NONE){
        console.log("Auto-starting process :",getProcessTypeName(type));
        ProcessEnv.process_is_auto = true;
        ProcessEnv.process = type;
        this.PD={}
        ProcessEnv.step = ProcessStep.PROCESS_START;
        this.nextStep();
      }
    }
  }

  storeData(varname:string, value:any):void{
    (this.PD as any)[varname]=value;
    console.log("PD after storeData");
    console.log(this.PD);
  }

  storeAutoData(varname:string, value:any):void{
    (ProcessEnv.AutoProcessData as any)[varname]=value;
    console.log("APD after storeData");
    console.log(ProcessEnv.AutoProcessData);
  }

  async nextStep(){
    var go_again=false;
    var n_self=0;
    while(true){
      var reportString="";
      n_self++;
      go_again=false;
      var type:ProcessType = ProcessEnv.process;
      var step:ProcessStep = ProcessEnv.step;
     // var data:Map<string, any> = this.PD;
      if(step==ProcessStep.PROCESS_START){
        console.log("/*************/");
        console.log("STARTING PROCESS :",getProcessTypeName(type));
      }
      else{
        reportString="=> "+getProcessStepName(step);
      }
      //console.log(data);
      if(step==ProcessStep.NONE || type==ProcessType.NONE){
        console.log(reportString,"ProcessManagerService.nextStep: ERROR");
        return;
      }
      else if(step==ProcessStep.ABORTED_PROCESS){
        ProcessEnv.process = ProcessType.NONE;
        ProcessEnv.step = ProcessStep.NONE;
        console.log(reportString,"Aborted due to", this.PD.message!);
        return;
      }
      else{
        switch(type){
          case ProcessType.BOX_CREATION:
            switch(step){
              case ProcessStep.PROCESS_START:{ //OK
                ProcessEnv.step = ProcessStep.GET_BARCODE;
                go_again=true;
                console.log(reportString);
                break;
              }
              case ProcessStep.GET_BARCODE:{ //OK
                //proceed to receive barcode
                this.showPopup(PopupIdentifier.BARCODE_INPUT,[],["barcode"],[],[ProcessStep.GET_BGGID]);
                console.log(reportString);
                break;
              }
              case ProcessStep.GET_BGGID:{
                let result= await BARCODES.get_bggid(this.PD.barcode!);
                if(result.bggid===undefined){
                  reportString+=" (No BGG ID found for this barcode)";
                  ProcessEnv.step = ProcessStep.ASK_TITLE;
                  go_again=true;
                  console.log(reportString);
                }
                else{
                  reportString+=" (BGG ID found on " +getSourceName(result.source!)+")";
                  this.PD.bgg_id=result.bggid ?? undefined;
                  this.PD.bgg_id_source=result.source!;
                  ProcessEnv.step = ProcessStep.GET_BGGINFO;
                  go_again=true;
                  console.log(reportString);
                }
                break;
              }
              case ProcessStep.ASK_TITLE:{
                this.showPopup(PopupIdentifier.TEXT_INPUT,["Game Title :"],["search_title"],[],[ProcessStep.SEARCH_BGG_BY_TITLE]);
                console.log(reportString);
                break;
              }
              case ProcessStep.SEARCH_BGG_BY_TITLE:{
               var searchresults=(await http_utils.search_bgg_by_title(this.PD.search_title!)).sdata;
                if(searchresults.length==0){
                  reportString+=" ABORTED";
                  console.log(reportString);
                  this.abort("No results found for title search");
                  return;
                }
                else if (searchresults.length==1){
                  this.PD.bgg_id=searchresults[0].bgg_id ?? undefined;
                  this.PD.bgg_id_source=SourceID.EXT_API;
                  ProcessEnv.step = ProcessStep.GET_BGGINFO;
                  reportString+=" (1 Match found from "+ getSourceName(SourceID.EXT_API)+")";
                  console.log(reportString);
                  //Store both locally and remote
                  go_again=true;
                }
                else{
                  var options:Option_t[]=searchresults.map((x)=>{return {val:x.bgg_id,label:x.bgg_name + " (" + x.bgg_year + ")"};});
                  reportString+=" ("+options.length+" Matches found from "+getSourceName(SourceID.EXT_API)+")";
                  this.showPopup(PopupIdentifier.CHOICE_INPUT,["Select the correct game :"],["bgg_id"],options,[ProcessStep.CONFIRM_BGG_SELECTION]);
                  console.log(reportString);
                }
                break;
              }
              case ProcessStep.CONFIRM_BGG_SELECTION:{
                this.PD.bgg_id_source=SourceID.EXT_API;
                ProcessEnv.step = ProcessStep.GET_BGGINFO;
                go_again=true;
                console.log(reportString);
                break;
              }
              case ProcessStep.GET_BGGINFO:{
                BARCODES.add_entry(this.PD.barcode!, this.PD.bgg_id!);
                let result= await BGG.get_bgginfo(this.PD.bgg_id!);
                if(result.info===undefined){
                  reportString+=" ABORTED";
                  console.log(reportString);
                  this.abort("Failed to retrieve BGG info for BGG ID " + this.PD.bgg_id!);
                  return;
                }
                else{
                  this.PD.bgg_info=result.info!;
                  this.PD.bgg_info_source=result.source!;
                  reportString+=" (info recovered from "+getSourceName(result.source!)+")";
                  if(result.info.title_show == undefined){
                    this.showPopup(PopupIdentifier.TEXT_INPUT,["Insert Title to Show :"],["title_show"],[],[ProcessStep.GET_OWNER]);
                    console.log(reportString);
                  }
                  else{
                    ProcessEnv.step = ProcessStep.GET_OWNER;
                    go_again=true;
                    console.log(reportString);
                  }
                }
                break;
              }
              case ProcessStep.GET_OWNER:{
                console.log(ProcessEnv);
                if(this.PD.bgg_info!.title_show === undefined){
                  this.PD.bgg_info!.set_show_title(this.PD.title_show!);
                }
                this.showPopup(PopupIdentifier.CHOICE_CREATE_INPUT,["Select Owner:"],["selected_owner"],OWNERS.getOptions(),[ProcessStep.ADD_OWNER,ProcessStep.CREATE_OWNER]);
                console.log(reportString);
                break;
              }
              case ProcessStep.CREATE_OWNER:{
                this.showPopup(PopupIdentifier.TEXT_INPUT,["Enter new Owner name :"],["selected_owner"],[],[ProcessStep.ADD_OWNER]);
                console.log(reportString);
                break;
              }
              case ProcessStep.ADD_OWNER:{
                console.log(this.PD);
                OWNERS.add_entry(this.PD.selected_owner!);
                //now create the box and add to remote
                let box=new BggBox({box_bgg_id:this.PD.bgg_id!, box_owner:this.PD.selected_owner!});
                EV_BOXES.add_box(box);
                ProcessEnv.step = ProcessStep.END_PROCESS;
                go_again=true;
                console.log(reportString);
                break;
              }
              case ProcessStep.END_PROCESS:{
                console.log(reportString);
                console.log("Process ",getProcessTypeName(type)," completed successfully.");
                ProcessEnv.process = ProcessType.NONE;
                ProcessEnv.step = ProcessStep.NONE;
                break;
              }
              default:
                console.log("ProcessManagerService.nextStep: Reached unknown state :",getProcessTypeName(type),":",getProcessStepName(step));
                console.log(ProcessEnv);
            }
            break;
         /* case ProcessType.BOX_GROUP_ASSIGN:
            switch(step){
              case ProcessStep.PROCESS_START:{ //OK
                this.showPopup(PopupIdentifier.CHOICE_CREATE_INPUT,["Select Group:"],["selected_group"],getGroupOptions(),[ProcessStep.SET_GROUP,ProcessStep.CREATE_GROUP]);
                console.log(reportString);
                break;
              }
              case ProcessStep.CREATE_GROUP:{
                this.showPopup(PopupIdentifier.TEXT_INPUT,["Enter new Group name :"],["new_group_name"],[],[ProcessStep.SYNC_GROUP]);
                console.log(reportString);
                break;
              }
              case ProcessStep.SYNC_GROUP:{
                await this.sql.store_box_group(this.PD.new_group_name!);
                this.PD.selected_group=getGroupNumber(this.PD.new_group_name!);
                ProcessEnv.step = ProcessStep.SET_GROUP;
                go_again=true;
                console.log(reportString);
                break;
              }
              case ProcessStep.SET_GROUP:{
                this.PD.box!.box_group_id=this.PD.selected_group!;
                await this.sql.update_box(this.PD.box!);
                ProcessEnv.step = ProcessStep.END_PROCESS;
                go_again=true;
                console.log(reportString);
                break;
              }
            }
            break;*/
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
