import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BggSqlMngrModule, BggSqlMngrService } from 'bgg-sql-mngr';
import { MainnavbarComponent } from "./components/mainnavbar/mainnavbar.component";
import { PpbarcodeComponent } from './components/popups/ppbarcode/ppbarcode.component';
import { A11yModule } from '@angular/cdk/a11y'
import { PpinputComponent } from './components/popups/ppinput/ppinput.component';
import { BoxmanagerComponent } from './components/panels/boxmanager/boxmanager.component';
import { PpfakeinputComponent } from './components/popups/ppfakeinput/ppfakeinput.component';

@NgModule({
  declarations: [
    AppComponent,
    PpbarcodeComponent,
    PpinputComponent,
    PpfakeinputComponent,
    BoxmanagerComponent
  ],
  imports: [
    BggSqlMngrModule,
    BrowserModule,
    AppRoutingModule,
    MainnavbarComponent,
    A11yModule
],
  providers: [BggSqlMngrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
