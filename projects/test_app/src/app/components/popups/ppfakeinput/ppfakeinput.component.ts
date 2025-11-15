import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ppfakeinput',
  standalone: false,
  templateUrl: './ppfakeinput.component.html',
  styleUrl: './ppfakeinput.component.css',
})
export class PpfakeinputComponent {

  @Input({required:true}) selector?:number;
  @Input({required:true}) select_val:number=-1;


  @Output() evtConfirm = new EventEmitter<string>();


  barcode:string="";

  onInputChange(value: string) {
    this.barcode = value;
  }

  onKeyPressed($event: KeyboardEvent) {
    console.log($event.key);
    if($event.key === "Enter"){
      console.log("I'm here");
      if(this.barcode.trim() == ""){
      } else {
        this.evtConfirm.emit(this.barcode);
        this.barcode="";
      }
    }
    else if($event.key === "CarridgeReturn"){
      if(this.barcode.trim() == ""){
      } else {
        this.evtConfirm.emit(this.barcode);
        this.barcode="";
      }
    }

  }
}
