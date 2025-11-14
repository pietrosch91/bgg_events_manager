import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BggSqlMngrModule } from 'bgg-sql-mngr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BggSqlMngrModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
