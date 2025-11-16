import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupIdentifier, ProcessEnv, ProcessManagerService, ProcessStep } from '../../process-manager.service';

@Component({
  selector: 'app-ppfakeinput',
  standalone: false,
  templateUrl: './ppfakeinput.component.html',
  styleUrl: './ppfakeinput.component.css',
})
export class PpfakeinputComponent {
  public id=PopupIdentifier.HIDDEN_BARCODE_INPUT;
  public env=ProcessEnv;

  barcode:string="";

  constructor(private pm: ProcessManagerService) {}

  report(){
    console.log("Acquired focus");
  }

  onInputChange(value: string) {
    this.barcode = value;
  }

  onKeyPressed($event: KeyboardEvent) {
    console.log($event.key);
    if($event.key === "Enter"){
      console.log("I'm here");
      if(this.barcode.trim() == ""){
      } else {
        this.env.ProcessData.set("barcode", this.barcode);
        this.env.step=ProcessStep.GET_BARCODE;
        this.env.visible_popup=PopupIdentifier.NONE;
        this.env.hidden_input_active=false;
        this.pm.nextStep();
        this.barcode="";
      }
    }
    else if($event.key === "CarridgeReturn"){
      if(this.barcode.trim() == ""){
      } else {
        this.env.ProcessData.set("barcode", this.barcode);
        this.env.step=ProcessStep.GET_BARCODE;
        this.env.visible_popup=PopupIdentifier.NONE;
        this.env.hidden_input_active=false;
        this.pm.nextStep();
        this.barcode="";
      }
    }
  }

  onBlur($event:FocusEvent) {
    console.log($event);
    console.log("Focus lost");
    this.pm.hidden_input_refocus();
  }

  cancel(){
    this.env.ProcessData.set("message","Aborted by user");
    this.env.step=ProcessStep.ABORTED_PROCESS;
    this.env.visible_popup=PopupIdentifier.NONE;
    this.env.hidden_input_active=false;
    this.pm.nextStep();
    this.barcode="";
  }
}
