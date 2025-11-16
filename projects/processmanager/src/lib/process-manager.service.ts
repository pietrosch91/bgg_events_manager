import { Injectable } from '@angular/core';

export enum ProcessType {
  NONE = 0,
  BOX_CREATION = 1,
}

export enum ProcessStep {
  ABORTED_PROCESS = -1,
  NONE = 0,
  PROCESS_START = 1,
  GET_BARCODE = 2,
}

export enum PopupIdentifier {
  NONE = 0,
  HIDDEN_BARCODE_INPUT = 1,
}

export interface _ProcessEnv_t{
    visible_popup:PopupIdentifier,
    hidden_input_active:boolean,
    process:ProcessType,
    step:ProcessStep,
    ProcessData:Map<string, any>;
}

export const ProcessEnv:_ProcessEnv_t={
    visible_popup:PopupIdentifier.NONE,
    hidden_input_active:false,
    process:ProcessType.NONE,
    step:ProcessStep.PROCESS_START,
    ProcessData:new Map<string, any>()
};

@Injectable({
  providedIn: 'root',
})

export class ProcessManagerService {
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

  start_process(type:ProcessType){
    ProcessEnv.ProcessData.clear();
    ProcessEnv.process = type;
    ProcessEnv.step = ProcessStep.PROCESS_START;
    this.nextStep();
  }

  nextStep(){
    var type:ProcessType = ProcessEnv.process;
    var step:ProcessStep = ProcessEnv.step;
    var data:Map<string, any> = ProcessEnv.ProcessData;
    console.log("Inside nextStep: step=",step," type=",type);
    console.log(data);
    if(step==ProcessStep.NONE || type==ProcessType.NONE){
      console.log("ProcessManagerService.nextStep: ERROR");
      return;
    }
    if(step==ProcessStep.ABORTED_PROCESS){
      console.log("ProcessManagerService.nextStep: Process Aborted due to", data.get("message"));
      return;
    }
    switch(type){
      case ProcessType.BOX_CREATION:
        if(step == ProcessStep.PROCESS_START){
          //proceed to receive barcode
          ProcessEnv.visible_popup = PopupIdentifier.HIDDEN_BARCODE_INPUT;
          ProcessEnv.hidden_input_active = true;
          return;
        }
    }
    console.log("ProcessManagerService.nextStep: Reached unknown state :");
    console.log(ProcessEnv);
    return;
  }



}
