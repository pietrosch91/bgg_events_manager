import { Component } from '@angular/core';
import { ProcessManagerService, ProcessType } from 'processmanager';

@Component({
  selector: 'app-boxmanager',
  standalone: false,
  templateUrl: './boxmanager.component.html',
  styleUrl: './boxmanager.component.css',
})
export class BoxmanagerComponent {
  start_create(){
    this.procmngr.start_process(ProcessType.BOX_CREATION);
  }
  constructor(private procmngr:ProcessManagerService){}
}
