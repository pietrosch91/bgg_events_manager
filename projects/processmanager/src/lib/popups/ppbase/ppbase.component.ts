import { Component } from '@angular/core';
import { PopupIdentifier, ProcessEnv, ProcessManagerService, ProcessStep } from '../../process-manager.service';

@Component({
  selector: 'lib-ppbase',
  standalone: false,
  templateUrl: './ppbase.component.html',
  styleUrl: './ppbase.component.css',
})
export class PpbaseComponent {

  public id=PopupIdentifier.NONE;
  public env=ProcessEnv;
  public values:any[]=[];


  constructor (protected pm:ProcessManagerService){}

  confirm(state_index:number =0){
    for(let i=0;i<this.values.length;i++){
      this.pm.storeData(this.env.popups.varnames[i], this.values[i]);
      this.values[i]="";
    }
    this.pm.setNextStep(this.env.popups.steps[state_index]);
    this.pm.hidePopup();
    this.pm.nextStep();
  }

  cancel(){
    this.pm.abort("Aborted by user");
    this.pm.hidePopup();
  }
}
