import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupIdentifier, ProcessEnv, ProcessManagerService, ProcessStep } from '../../process-manager.service';
import { PpbaseComponent } from '../ppbase/ppbase.component';


@Component({
  selector: 'lib-pp-input',
  standalone: false,
  templateUrl: './ppinput.component.html',
  styleUrl: './ppinput.component.css',
})
export class PpinputComponent extends PpbaseComponent {

  constructor(override pm: ProcessManagerService) {
    super(pm);
    this.id=PopupIdentifier.TEXT_INPUT;
    this.values=[""];
  }



}


