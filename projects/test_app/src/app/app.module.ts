import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//externals
import { A11yModule } from '@angular/cdk/a11y'
//internal MODULE
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


import { MainnavbarComponent } from "./components/mainnavbar/mainnavbar.component";

import { BoxmanagerComponent } from './components/panels/boxmanager/boxmanager.component';

//internal OTHER MODULES
import { ProcessmanagerModule,ProcessManagerService } from 'processmanager';
import { BggSqlMngrModule, BggSqlMngrService } from 'bgg-sql-mngr';

@NgModule({
  declarations: [
    AppComponent,
    BoxmanagerComponent
  ],
  imports: [
    BggSqlMngrModule,
    ProcessmanagerModule,
    BrowserModule,
    AppRoutingModule,
    MainnavbarComponent,
    A11yModule
],
  providers: [BggSqlMngrService,ProcessManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
