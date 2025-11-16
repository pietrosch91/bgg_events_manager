import { NgModule } from '@angular/core';
import { PpBarcodeComponent } from './popups/ppbarcode/ppbarcode.component';
import { ProcessManagerComponent } from './process-manager/process-manager.component';
import { A11yModule } from '@angular/cdk/a11y'
import { PpinputComponent } from './popups/ppinput/ppinput.component';
import { PpChoiceComponent } from "./popups/pp-choice/pp-choice.component";


@NgModule({
  declarations: [
    PpBarcodeComponent,
    PpinputComponent,
    ProcessManagerComponent,
  ],
  imports: [
    A11yModule,
    PpChoiceComponent
],
  exports: [
    ProcessManagerComponent,
  ]
})
export class ProcessmanagerModule { }
