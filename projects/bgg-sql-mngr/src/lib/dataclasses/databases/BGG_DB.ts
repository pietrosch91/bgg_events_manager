import { SourceID } from "../bgg-interfaces";
import { http_utils } from "../HTTP_utils";

export class BggInfo {
  age_min? : number;
  bgg_id? : number;
  cover? : string;
  len_max? : number;
  len_min? : number;
  pl_max? :number;
  pl_min? : number;
  title_en? : string;
  title_show? : string;
  url? : string;
  weight? : number;
  year? : number;

  constructor(data:any){
    this.age_min = data.age_min;
    this.bgg_id = data.id;
    this.cover = data.cover;
    this.len_max = data.len_max;
    this.len_min = data.len_min;
    this.pl_max = data.pl_max;
    this.pl_min = data.pl_min;
    this.title_en = data.title_en;
    this.title_show = data.title_show;
    this.url = data.url;
    this.weight = data.weight;
    this.year = data.year;
  }

  insertQuery():string{
    return `INSERT INTO BGG (id, title_en, title_show, year, pl_min, pl_max, len_min, len_max, weight, age_min, url, cover) VALUES (${this.bgg_id}, '${this.title_en}', '${this.title_show}', ${this.year}, ${this.pl_min}, ${this.pl_max}, ${this.len_min}, ${this.len_max}, ${this.weight}, ${this.age_min}, '${this.url}', '${this.cover}');`;
  }

  set_show_title(title:string){
    this.title_show=title;
    http_utils.insert(`UPDATE BGG SET title_show='${title}' WHERE id=${this.bgg_id};`);
  }

}

export class BGG_DB {
  BGG_INFOS: Map<number, BggInfo>= new Map<number, BggInfo>();

  async add_entry(entry: BggInfo,sync_remote: boolean=false){
    this.BGG_INFOS.set(entry.bgg_id!, entry);
    if(sync_remote){
      http_utils.insert(entry.insertQuery());
    }
  }

  async get_bgginfo(bggid:number): Promise<{info?:BggInfo,source?:SourceID}> {
      //Try locally
      var result=this.BGG_INFOS.get(bggid);
      if(result!==undefined){
        return {info:result, source:SourceID.LOCAL_DB};
      }
      //Try remotely
      var data=await http_utils.select("SELECT * FROM BGG WHERE id = " + bggid);
      if(data.sdata.length==1){
        var bgginfo=new BggInfo(data.sdata[0]);
        this.add_entry(bgginfo); //cache locally
        return {info:bgginfo, source:SourceID.REMOTE_DB};
      }
      //Ask BGG
      var data=await http_utils.scrapeBgg(bggid);
      var bgginfo=new BggInfo(data.sdata);
      this.add_entry(bgginfo,true); //cache locally and remotely
      return {info:bgginfo, source:SourceID.EXT_API};
    }
}