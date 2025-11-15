import { Component } from '@angular/core';
import { BggSqlMngrService } from 'bgg-sql-mngr';
import { knownGames,knownBarcodes,BggInfo } from 'bgg-sql-mngr';


@Component({
  selector: 'app-barcodepanel',
  standalone: false,
  templateUrl: './barcodepanel.component.html',
  styleUrl: './barcodepanel.component.css'
})

export class BarcodepanelComponent {
  recbarcode(bc: string) {
    //attempt to recover from local cache
    var bgg_id=knownBarcodes.get(bc);
    if(bgg_id){
      var bgginfo=knownGames.get(bgg_id);
      console.log("Found local match")
      console.log(bgginfo);
    }
    else{
      this.bggsql.get_bgg_info_from_barcode(bc).then(
        data=>{
          if(data.length==0){
            console.log("No match found remotely either");
            this.bggsql.search_bgg_by_title("Quarto").then(
              searchdata => {console.log(searchdata)}
            );
            return;
          }
          if(data.length>1){
            console.log("Multiple matches found remotely either");
            return;
          }
          var bgg_id=data[0].bgg_id;
          var bgginfo=knownGames.get(bgg_id);
          if(bgginfo){
            console.log("Fetched ID from remote, but found local match")
            knownBarcodes.set(bc, bgg_id!);
            console.log(bgginfo);
          }
          else{
            bgginfo=new BggInfo(data[0]);
            console.log("Fetched full info from remote");
            console.log(bgginfo);
          }

          console.log(data[0])
        });
    }
  }

  constructor(private bggsql: BggSqlMngrService){
  }


}
