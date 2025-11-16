import { Component } from '@angular/core';
import { PpbaseComponent } from '../ppbase/ppbase.component';
import { PopupIdentifier, ProcessManagerService } from '../../process-manager.service';

@Component({
  selector: 'lib-pp-choice',
  imports: [],
  templateUrl: './pp-choice.component.html',
  styleUrl: './pp-choice.component.css',
})
export class PpChoiceComponent extends PpbaseComponent{

    constructor(override pm: ProcessManagerService) {
      super(pm);
      this.id=PopupIdentifier.CHOICE_INPUT;
      this.values=[""];
    }
}
