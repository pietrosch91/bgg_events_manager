import { Component } from '@angular/core';
import { BggSqlMngrService } from 'bgg-sql-mngr';
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

  dump_local(){
    this.sqlmanager.dump_local_db();
  }
  constructor(private procmngr:ProcessManagerService,private sqlmanager:BggSqlMngrService){}
}
