import { Component } from '@angular/core';
import { PpbaseComponent } from '../ppbase/ppbase.component';
import { PopupIdentifier, ProcessManagerService } from '../../process-manager.service';


@Component({
  selector: 'lib-pp-choice-create',
  standalone: false,
  templateUrl: './pp-choice_create.component.html',
  styleUrl: './pp-choice_create.component.css',
})
export class PpChoiceCreateComponent extends PpbaseComponent{

    set(value: number){
      this.values[0]=this.env.popups.options[value].val;
    }

    constructor(override pm: ProcessManagerService) {
      super(pm);
      this.id=PopupIdentifier.CHOICE_CREATE_INPUT;
      this.values=[0];
    }
}
