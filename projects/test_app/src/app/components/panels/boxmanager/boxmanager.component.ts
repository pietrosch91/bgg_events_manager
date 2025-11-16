import { Component } from '@angular/core';
import { bgg_search_status, BggSqlMngrService } from 'bgg-sql-mngr';
import { knownGames,knownBarcodes,BggInfo } from 'bgg-sql-mngr';
import { PpinputComponent } from '../../../../../../processmanager/src/lib/popups/ppinput/ppinput.component';
import { ProcessManagerService, ProcessType } from 'processmanager';

@Component({
  selector: 'app-boxmanager',
  standalone: false,
  templateUrl: './boxmanager.component.html',
  styleUrl: './boxmanager.component.css',
})
export class BoxmanagerComponent {
  start_create(){
    this.procmngr.start_process(ProcessType.BOX_CREATION);
  }
  constructor(private procmngr:ProcessManagerService){}
}
