import { Component, Input } from '@angular/core';
import { BggBox, } from 'bgg-sql-mngr';

@Component({
  selector: 'app-boxview-group',
  standalone: false,
  templateUrl: './boxview-group.component.html',
  styleUrl: './boxview-group.component.css',
})
export class BoxviewGroupComponent {

  //DB=LocalDb;


  @Input({required:true}) Box?:BggBox;



}
