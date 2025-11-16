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

  confirm(){
    for(let i=0;i<this.values.length;i++){
      this.pm.storeData(this.env.popups.varnames[i], this.values[i]);
      this.values[i]="";
    }
    this.pm.setNextStep(this.env.popups.step_success);
    this.pm.hidePopup();
    this.pm.nextStep();
  }

  cancel(){
    this.pm.abort("Aborted by user");
    this.pm.hidePopup();
  }
}
