import { Component } from '@angular/core';
import { PpbaseComponent } from '../ppbase/ppbase.component';
import { PopupIdentifier, ProcessManagerService } from '../../process-manager.service';


@Component({
  selector: 'lib-pp-choice',
  standalone: false,
  templateUrl: './pp-choice.component.html',
  styleUrl: './pp-choice.component.css',
})
export class PpChoiceComponent extends PpbaseComponent{

    set(value: number){
      this.values[0]=this.env.popups.options[value].val;
    }

    constructor(override pm: ProcessManagerService) {
      super(pm);
      this.id=PopupIdentifier.CHOICE_INPUT;
      this.values=[0];
    }
}
