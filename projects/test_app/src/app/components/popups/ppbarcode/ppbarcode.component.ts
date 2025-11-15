import { Component, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-ppbarcode',
  standalone: false,
  templateUrl: './ppbarcode.component.html',
  styleUrl: './ppbarcode.component.css'
})
export class PpbarcodeComponent {

  @Output () evtClose = new EventEmitter<void>();
  @Output () evtError = new EventEmitter<string>();
  @Output () evtConfirm = new EventEmitter<string>();

  public is_shown: boolean = false;
  barcode:string="";

  show(){
    this.is_shown = true;
    this.barcode = "";
  }

  hide(){
    this.is_shown = false;
  }

  onInputChange(value: string) {
    this.barcode = value;
  }

  onKeyPressed($event: KeyboardEvent) {
    console.log($event.key);
    if($event.key === "Enter"){
      console.log("I'm here");
      if(this.barcode.trim() == ""){
        this.evtError.emit("Barcode cannot be empty.");
      } else {
        this.confirm();
      }
    }
    else if($event.key === "CarridgeReturn"){
      if(this.barcode.trim() == ""){
        this.evtError.emit("Barcode cannot be empty.");
      } else {
        this.confirm();
      }
    }

  }

  close(){
    this.evtClose.emit();
    this.hide();
  }

  confirm(){
    this.evtConfirm.emit(this.barcode);
    this.hide();
  }

  constructor(){
    this.is_shown = false;
  }
}
