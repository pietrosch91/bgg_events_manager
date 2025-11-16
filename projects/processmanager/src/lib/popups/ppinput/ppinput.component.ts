import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ppinput',
  standalone: false,
  templateUrl: './ppinput.component.html',
  styleUrl: './ppinput.component.css',
})
export class PpinputComponent {

  @Input({required:true}) selector?:number;
  @Input({required:true}) select_val:number=-1;
  @Input({required:true}) title_text:string="";

  @Output() evtClose = new EventEmitter<void>();
  @Output() evtConfirm = new EventEmitter<string>();

}
