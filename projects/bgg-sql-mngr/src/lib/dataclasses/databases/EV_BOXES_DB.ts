import { http_utils } from "../HTTP_utils";

export class BggBox{
  box_id?:number;
  box_bgg_id:number=0;
  box_owner:string="";
  box_scaffold_id:number|null=null;
  box_loaned_to:string|null=null;
  box_loan_start:Date|null=null;
  box_group_id:number|null=null;
  box_show_title: string|null=null;


  constructor(data:any){
    this.parse_SQL(data);
  }

  parse_SQL(data:any){
    this.box_id = data.box_id;
    this.box_bgg_id = data.box_bgg_id;
    this.box_owner = data.box_owner;
    this.box_scaffold_id = data.box_scaffold_id;
    this.box_loaned_to = data.box_loaned_to;
    this.box_loan_start = data.box_loan_start;
    this.box_group_id = data.box_group_id;
    this.box_show_title=data.title_show;
  }


  insertQuery():string{
    return `INSERT INTO EV_BOXES ( box_bgg_id, box_owner) VALUES (${this.box_bgg_id}, '${this.box_owner}');`;
  }



}

export class EV_BOXES_DB{
  EV_BOXES:Map<number,BggBox>=new Map<number,BggBox>();

  reload_from_remote(){
    this.EV_BOXES.clear();
    http_utils.select("SELECT * FROM EV_BOXES LEFT JOIN BGG ON EV_BOXES.box_bgg_id = BGG.id ").then((data)=>{
          for(let row of data.sdata){
            console.log(row);
            let box_id=row.box_id;
            this.EV_BOXES.set(box_id, new BggBox(row)); //update local
          }
          console.log("EV_BOXES initialized with " + this.EV_BOXES.size + " entries.");
          console.log(this.EV_BOXES);
        });
  }

  add_box(box:BggBox){
    if(box.box_id===undefined){ //this is a new box, locally generated
      http_utils.insert(box.insertQuery()).then(()=>{
        http_utils.select("SELECT * FROM EV_BOXES LEFT JOIN BGG ON EV_BOXES.box_bgg_id = BGG.id WHERE box_bgg_id = " + box.box_bgg_id + ";").then((data)=>{
          for(let row of data.sdata){
            let box_id=row.box_id;
            if(!this.EV_BOXES.has(box_id)){
              this.EV_BOXES.set(box_id, new BggBox(row)); //update local
            }
          }
        });
      });
    }
    else{
      this.EV_BOXES.set(box.box_id, box); //just update local
    }
  }

  constructor(){
    this.reload_from_remote();
  }
}