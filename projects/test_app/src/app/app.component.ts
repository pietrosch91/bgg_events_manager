import { Component } from '@angular/core';
import { BggSqlMngrService } from 'bgg-sql-mngr';
import { ProcessManagerService,ProcessManagerComponent } from 'processmanager';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test_app';

  constructor(private bggsql: BggSqlMngrService,private procmngr:ProcessManagerService){
    //this.bggsql.select("SELECT * FROM BGG").then(data => {console.log(data);});
    //this.bggsql.search_bgg_by_title("Quarto").then(data => {console.log(data);});

  }
}

