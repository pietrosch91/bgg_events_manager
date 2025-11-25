import { SourceID } from "../bgg-interfaces";
import { http_utils } from "../HTTP_utils";




export class BARCODE_DB {
  BARCODES: Map<string, number>= new Map<string, number>();

  reload_from_remote(){
    this.BARCODES.clear();
    http_utils.select("SELECT * FROM BARCODES;").then((data)=>{
      for(let row of data.sdata){
        this.BARCODES.set(row.barcode, row.bgg_id);
      }
      console.log("BARCODE_DB initialized with " + this.BARCODES.size + " entries.");
      console.log(this.BARCODES);
    });
  }

  add_entry(barcode:string, bgg_id:number){
    if(this.BARCODES.has(barcode)){
      return;
    }
    this.BARCODES.set(barcode, bgg_id);
    http_utils.insert("INSERT INTO BARCODES (barcode, bgg_id) VALUES ('" + barcode + "', " + bgg_id + ");");
  }

  constructor(){
    this.reload_from_remote();
  }

  async get_bggid(barcode:string): Promise<{bggid?:number,source?:SourceID}> {
    //Try locally
    var result=this.BARCODES.get(barcode);
    if(result!==undefined){
      return {bggid:result, source:SourceID.LOCAL_DB};
    }
    //Try remotely
    var data=await http_utils.select("SELECT * FROM BARCODES WHERE barcode = '" + barcode + "';");
    if(data.sdata.length>1){
      return {}
    }
    if(data.sdata.length==0){
      return {}
    }
    this.BARCODES.set(barcode, data.sdata[0].bgg_id); //cache locally
    return {bggid:data.sdata[0].bgg_id, source:SourceID.REMOTE_DB};
  }

}
