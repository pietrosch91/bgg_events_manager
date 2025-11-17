import { Injectable } from '@angular/core';
import { BggSearchResult } from './dataclasses/bgg-interfaces';
import { LocalDb } from './dataclasses/bgg-local-db';
import { BggInfo } from './dataclasses/bgg-info';


export enum SourceID {
  LOCAL_DB = 0,
  REMOTE_DB = 1,
  EXT_API = 2,
}


@Injectable({
  providedIn: 'root'
})
export class BggSqlMngrService {

  dump_local_db(): void {
    console.log(LocalDb);
  }

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

  constructor() {

  }

  async select(query: string): Promise<{sdata:any[]}> {
    return this.postData('http://192.168.1.7:7777/select', { query: query });
  }

  insert(query: string): void{
    this.postData('http://192.168.1.7:7777/insert', { query: query });
  }

  async get_bgg_info_from_barcode(barcode: string): Promise<{sdata:any[]}> {
    return this.select("SELECT * FROM BARCODES AS c LEFT JOIN BGG AS b ON c.bgg_id = b.id WHERE c.barcode = '" + barcode + "';");
  }

  async search_bgg_by_title(title: string): Promise<{sdata:BggSearchResult[]}> {
    return this.postData("http://192.168.1.7:7777/search", { title: title });
  }



  store_barcode(barcode: string, bgg_id: number,local_only:boolean=false): void {
      LocalDb.BARCODES.set(barcode, bgg_id); //store locally
      if(!local_only) this.insert("INSERT INTO BARCODES (barcode, bgg_id) VALUES ('" + barcode + "', " + bgg_id + ");");
  }

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
      this.store_barcode(barcode, data[0].bgg_id,true); //store locally
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
      LocalDb.BGG.set(bgg_id,bgginfo); //store locally
      return {info:bgginfo,message:"Entry found in remote database",source:SourceID.REMOTE_DB};
    }
    else{
      var search_result=(await this.postData("http://192.168.1.7:7777/scrape", { ID: bgg_id })).sdata;
      var bgginfo=new BggInfo(search_result);
      LocalDb.BGG.set(bgg_id,bgginfo); //store locally
      return {info:bgginfo,message:"Entry scraped from BGG website",source:SourceID.EXT_API};
    }
}


}
