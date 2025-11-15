import { Component } from '@angular/core';
import { BggSqlMngrService } from 'bgg-sql-mngr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test_app';

  constructor(private bggsql: BggSqlMngrService){
    this.bggsql.select("SELECT * FROM BGG").then(data => {console.log(data);});
  }
}
