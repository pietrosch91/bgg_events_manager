import { Component } from '@angular/core';
import { AutoInputType } from '../../process-manager.service';

@Component({
  selector: 'lib-autoinputs',
  standalone: false,
  templateUrl: './autoinputs.component.html',
  styleUrl: './autoinputs.component.css',
})
export class AutoinputsComponent {
  public AutoInputType = AutoInputType;
}
