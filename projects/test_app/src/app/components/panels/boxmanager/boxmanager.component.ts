import { Component } from '@angular/core';
import { BggSqlMngrService } from 'bgg-sql-mngr';
import { BoxCreation, } from 'processmanager';

@Component({
  selector: 'app-boxmanager',
  standalone: false,
  templateUrl: './boxmanager.component.html',
  styleUrl: './boxmanager.component.css',
})
export class BoxmanagerComponent {

  create_box=new BoxCreation();

  start_create(){
    this.create_box.init();
  }

  dump_local(){
    this.sqlmanager.dump_local_db();
  }
  constructor(private sqlmanager:BggSqlMngrService){}
}
