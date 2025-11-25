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
import { BoxviewGroupComponent } from './components/boxviews/boxview-group/boxview-group.component';
import { BoxpanelGroupsComponent } from './components/panels/boxpanel-groups/boxpanel-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxmanagerComponent,
    BoxviewGroupComponent,
    BoxpanelGroupsComponent
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
