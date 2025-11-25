import { Option_t } from "../bgg-interfaces";
import { http_utils } from "../HTTP_utils";






export class OWNERS_DB{
  OWNERS: Array<string> = new Array<string>();

  getOptions() : Option_t[]{
    let options=[];
    for(let owner of this.OWNERS){
      options.push({val:owner, label:owner});
    }
    return options;
  }

  add_entry(owner:string){
    if(!this.OWNERS.includes(owner)){
      this.OWNERS.push(owner);
      this.OWNERS.sort();
      //add to remote
      http_utils.insert("INSERT INTO OWNERS (name) VALUES ('" + owner + "');");
    }
  }

  reload_from_remote(){
    this.OWNERS=[];
    http_utils.select("SELECT * FROM OWNERS;").then((data)=>{
      for(let owner of data.sdata){
        this.OWNERS.push(owner.name);
      }
      this.OWNERS.sort();
      console.log("OWNERS_DB initialized with " + this.OWNERS.length + " entries.");
      console.log(this.OWNERS);
    });
  }

  constructor(){
    this.reload_from_remote();
  }



}