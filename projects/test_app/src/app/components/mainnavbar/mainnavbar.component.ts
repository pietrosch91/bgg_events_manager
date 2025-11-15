import { Component } from '@angular/core';

@Component({
  selector: 'app-mainnavbar',
  templateUrl: './mainnavbar.component.html',
  styleUrl: './mainnavbar.component.css'
})

export class MainnavbarComponent {

  selected_menu:string = "";

  list_of_menus:string[] = ["home","search","collections","stats","forums","about","btc"];
  list_of_menu_names:string[] = ["Home","Search","Collections","Stats","Forums","About","Barcode Table Checker"];

  get_class(classes:string,target:string) : string{
    if(this.selected_menu == target){
      return classes + " active";
    }
    return classes;
  }

  constructor (){};
}
