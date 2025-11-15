import { Component } from '@angular/core';
import { bgg_search_status, BggSqlMngrService } from 'bgg-sql-mngr';
import { knownGames,knownBarcodes,BggInfo } from 'bgg-sql-mngr';
import { PpinputComponent } from '../../popups/ppinput/ppinput.component';

@Component({
  selector: 'app-boxmanager',
  standalone: false,
  templateUrl: './boxmanager.component.html',
  styleUrl: './boxmanager.component.css',
})
export class BoxmanagerComponent {

  search_data:bgg_search_status={barcode:""};

  public popup_select:number=0;

  //first step.
  find_bgg_id_from_barcode(bc: string): void {
    this.search_data={barcode: bc};

    //CHECK LOCAL CACHE FIRST
    var bgg_id=knownBarcodes.get(bc);
    if(bgg_id){
      this.search_data.bgg_id=bgg_id;
      this.recover_bgg_info();
    }
    if(!bgg_id){
      //NOT FOUND LOCALLY, QUERY REMOTE
      this.bggsql.get_bgg_info_from_barcode(bc).then(
        data=>{
          if(data.length==0){
            console.log("No match found remotely either,recovering from web");
            this.popup_select=1;
          }
          else if(data.length>1){
            console.log("Multiple matches found remotely either");
            this.boxcreation_error("Multiple matches found for barcode "+bc);
            return;
          }
          else{
            this.search_data.bgg_id=data[0].bgg_id;
            knownBarcodes.set(bc,this.search_data.bgg_id!);
            this.recover_bgg_info();
          }
        });
      }
  }

  search_bgg_by_title($event: string) {
    this.bggsql.search_bgg_by_title("Quarto").then(data => {console.log(data);});
  }

  boxcreation_error(arg0: string) {
    throw new Error('Method not implemented.');
  }
  recover_bgg_info() {
    throw new Error('Method not implemented.');
  }


  constructor(private bggsql: BggSqlMngrService){
  }
}
