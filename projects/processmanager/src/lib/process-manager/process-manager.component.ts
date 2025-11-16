import { Component } from '@angular/core';
import {  ProcessEnv  } from '../process-manager.service';

@Component({
  selector: 'lib-process-manager',
  standalone: false,
  templateUrl: './process-manager.component.html',
  styleUrl: './process-manager.component.css',
})
export class ProcessManagerComponent {
    public env=ProcessEnv;
}
