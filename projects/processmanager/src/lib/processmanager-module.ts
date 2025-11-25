import { NgModule } from '@angular/core';
import { PpBarcodeComponent } from './popups/ppbarcode/ppbarcode.component';
import { ProcessManagerComponent } from './process-manager/process-manager.component';
import { A11yModule } from '@angular/cdk/a11y'
import { PpinputComponent } from './popups/ppinput/ppinput.component';
import { PpChoiceComponent } from "./popups/pp-choice/pp-choice.component";
import { PpChoiceCreateComponent } from './popups/pp-choice_create/pp-choice_create.component';
import { AutoinputComponent } from './autoinputs/autoinput/autoinput.component';
import { AutoinputsComponent } from './process-manager/autoinputs/autoinputs.component';


@NgModule({
  declarations: [
    PpBarcodeComponent,
    PpinputComponent,
    PpChoiceComponent,
    PpChoiceCreateComponent,
    ProcessManagerComponent,
    AutoinputComponent,
    AutoinputsComponent,
  ],
  imports: [
    A11yModule,

],
  exports: [
    ProcessManagerComponent,
    AutoinputsComponent
  ]
})
export class ProcessmanagerModule { }
