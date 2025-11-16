import { NgModule } from '@angular/core';
import { PpfakeinputComponent } from './popups/ppfakeinput/ppfakeinput.component';
import { ProcessManagerComponent } from './process-manager/process-manager.component';
import { A11yModule } from '@angular/cdk/a11y'


@NgModule({
  declarations: [
    PpfakeinputComponent,
    ProcessManagerComponent,
  ],
  imports: [
    A11yModule,
  ],
  exports: [
    ProcessManagerComponent,
  ]
})
export class ProcessmanagerModule { }
