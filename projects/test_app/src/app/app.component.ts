import { Component } from '@angular/core';
import { BggSqlMngrrService } from 'bgg-sql-mngr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test_app';

  constructor(private bggsql: BggSqlMngrrService){
    this.bggsql.executeSelectQuery("SELECT * FROM BGG");
  }
}
