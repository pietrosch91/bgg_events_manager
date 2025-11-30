import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupIdentifier, ProcessEnv, ProcessManagerService, ProcessStep } from '../../process-manager.service';
import { PpbaseComponent } from '../ppbase/ppbase.component';

@Component({
  selector: 'lib-pp-barcode',
  standalone: false,
  templateUrl: './ppbarcode.component.html',
  styleUrl: './ppbarcode.component.css',
})
export class PpBarcodeComponent extends PpbaseComponent {


  constructor(override pm: ProcessManagerService) {
    super(pm);
    console.log("Hidden input constructed");
    this.id=PopupIdentifier.BARCODE_INPUT;
    this.values=[""];
  }

  report(){
    //console.log("Acquired focus");
  }

  onInputChange(value: string) {
    this.values[0] = value;
  }

  onKeyPressed($event: KeyboardEvent) {
   // console.log($event.key);
    if($event.key === "Enter"){
      //console.log("I'm here");
      if(this.values[0].trim() == ""){
      }
      else {
        this.confirm();
      }
    }
    else if($event.key === "CarridgeReturn"){
      if(this.values[0].trim() == ""){
      }
      else {
        this.confirm();
      }
    }
  }

  onBlur($event:FocusEvent) {
    //console.log($event);
    //console.log("Focus lost");
    this.pm.hidden_input_refocus();
  }
}
