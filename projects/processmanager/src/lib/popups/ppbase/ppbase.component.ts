import { Component } from '@angular/core';
import { PopupIdentifier, ProcessEnv } from '../../processes/bgg-process'

@Component({
  selector: 'lib-ppbase',
  standalone: false,
  templateUrl: './ppbase.component.html',
  styleUrl: './ppbase.component.css',
})
export class PpbaseComponent {

  public id=PopupIdentifier.NONE;
  public env=ProcessEnv;
  public ppenv=ProcessEnv.popups;
  public values:any[]=[];


  constructor (){}

  confirm(save:boolean=true){
    if(this.ppenv.target===undefined) return;
    for(let i=0;i<this.values.length;i++){
      if(save) this.ppenv.target!.storeData(this.ppenv.varnames[i], this.values[i]);
      this.values[i]="";
    }
    this.ppenv.target.hidePopup();
    this.ppenv.target.next();
  }

  cancel(){
    if(this.ppenv.target===undefined) return;
    this.ppenv.target.hidePopup();
    this.ppenv.target.abort();
    this.ppenv.target.next();
  }
}
