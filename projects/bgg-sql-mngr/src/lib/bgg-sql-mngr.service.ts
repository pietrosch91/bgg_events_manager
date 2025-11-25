import { Injectable } from '@angular/core';
import { BggSearchResult } from './dataclasses/bgg-interfaces';
import { BARCODE_DB } from './dataclasses/databases/BARCODE_DB';
import { BGG_DB } from './dataclasses/databases/BGG_DB';
import { OWNERS_DB } from './dataclasses/databases/OWNERS_DB';
import { EV_BOXES_DB } from './dataclasses/databases/EV_BOXES_DB';

export const BARCODES=new BARCODE_DB();
export const BGG=new BGG_DB();
export const OWNERS=new OWNERS_DB();
export const EV_BOXES=new EV_BOXES_DB();

@Injectable({
  providedIn: 'root'
})
export class BggSqlMngrService {

  dump_local_db(): void {
    console.log(BARCODES);
    console.log(BGG);
    console.log(OWNERS);
    console.log(EV_BOXES);
  }

  /*
  private async postData(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  constructor(){
  }

  async select(query: string): Promise<{sdata:any[]}> {
    return this.postData('http://192.168.1.7:7777/select', { query: query });
  }

  async insert(query: string): Promise<void>{
    this.postData('http://192.168.1.7:7777/insert', { query: query });
    return;
  }

  async get_bgg_info_from_barcode(barcode: string): Promise<{sdata:any[]}> {
    return this.select("SELECT * FROM BARCODES AS c LEFT JOIN BGG AS b ON c.bgg_id = b.id WHERE c.barcode = '" + barcode + "';");
  }
*/
  /*
  async barcode_to_bggid(barcode: string): Promise<{lines:number,id:number|null,message:string,source:SourceID}> {
    //First check if barcode exists in LocalDb
    var result=LocalDb.BARCODES.get(barcode);
    if(result!==undefined){
      return {lines: 1,id:result, message: "Found in local database",source:SourceID.LOCAL_DB};
    }
    //Second: fetch from remote database
    var data=(await this.select("SELECT * FROM BARCODES WHERE barcode = '" + barcode + "';")).sdata;
    if(data.length>1){
      return {lines:data.length,id:null, message: "Error: Multiple entries found for barcode",source:SourceID.REMOTE_DB};
    }
    if(data.length==0){
      return {lines:0,id:null, message: "No entry found for barcode",source:SourceID.REMOTE_DB};
    }
    return {lines:1,id:data[0].bgg_id, message: "Entry found in remote database",source:SourceID.REMOTE_DB};
  }

  async bggid_to_info(bgg_id:number): Promise<{info:BggInfo|null,message:string,source:SourceID}> {
    //First check if bgginfo  exists in LocalDb
    var result=LocalDb.BGG.get(bgg_id);
    if(result!==undefined){
      return {info:result, message: "Found in local database",source:SourceID.LOCAL_DB};
    }
    //Second: fetch from remote database
    var data=(await this.select("SELECT * FROM BGG WHERE id = '" + bgg_id + "';")).sdata;
    if(data.length>1){
      return {info:null, message: "Error: Multiple entries found for barcode",source:SourceID.REMOTE_DB};
    }
    else if(data.length==1){
      var bgginfo=new BggInfo(data[0]);
      //LocalDb.BGG.set(bgg_id,bgginfo); //store locally
      return {info:bgginfo,message:"Entry found in remote database",source:SourceID.REMOTE_DB};
    }
    else{
      var search_result=(await this.postData("http://192.168.1.7:7777/scrape", { ID: bgg_id })).sdata;
      var bgginfo=new BggInfo(search_result);
      //LocalDb.BGG.set(bgg_id,bgginfo); //store locally
      return {info:bgginfo,message:"Entry scraped from BGG website",source:SourceID.EXT_API};
    }
  }

  //remote store function
  store_barcode(barcode: string, bgg_id: number,src:SourceID): void {
    if(src!=SourceID.LOCAL_DB){
      LocalDb.BARCODES.set(barcode, bgg_id); //store locally
    }
    if(src==SourceID.EXT_API){
      this.insert("INSERT INTO BARCODES (barcode, bgg_id) VALUES ('" + barcode + "', " + bgg_id + ");");
    }
  }

  store_bgginfo(info:BggInfo,src:SourceID): void {
    if(src!=SourceID.LOCAL_DB){
      LocalDb.BGG.set(info.bgg_id!,info); //store locally
    }
    if(src==SourceID.EXT_API){
      this.insert(info.insertQuery());
    }
  }

  store_owner(owner:string,remote:boolean=true): void {
    if(!LocalDb.OWNERS.includes(owner)){
      LocalDb.OWNERS.push(owner); //store locally
      LocalDb.OWNERS.sort();
      if(remote) this.insert("INSERT INTO OWNERS (name) VALUES ('" + owner + "');");
    }
  }

  async store_box(box:BggBox): Promise<void> {
    this.insert(box.insertQuery()).then(()=>{
      this.select("SELECT * FROM EV_BOXES LEFT JOIN BGG ON EV_BOXES.box_bgg_id = BGG.id WHERE box_bgg_id = " + box.box_bgg_id + ";").then((data)=>{
        for(let row of data.sdata){

          let box_id=row.box_id;
          if(!LocalDb.EV_BOXES.has(box_id)){
            LocalDb.EV_BOXES.set(box_id, new BggBox(row)); //update local
          }
        }
      });
    });
  }

  update_box(arg0: BggBox) {
        throw new Error('Method not implemented.');
  }

  async store_box_group(agrp: string) {
    throw new Error('Method not implemented.');
  }*/

}
