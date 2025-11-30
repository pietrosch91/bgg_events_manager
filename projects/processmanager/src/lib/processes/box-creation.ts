import { BARCODES, BGG, BggBox, BggInfo, BggSearchResult, EV_BOXES, http_utils, Option_t, OWNERS, SourceID } from "bgg-sql-mngr";
import { BggProcess, PopupIdentifier } from "./bgg-process";

export class BoxCreation extends BggProcess {

  constructor(){
    super();
    this.processName="BOX_CREATION";
  }

  public override async next() {
    let report="["+this.processName+"] "+this.current_step;
    switch(this.current_step){
      case 'start':{
        //check if barcode is given, otherwise show the popup
        if(this.test_auto_var("barcode")){
          this.current_step="get_bgginfo";
        }
        else{
          this.current_step="get_barcode";
        }
        break;
      }
      case 'get_barcode':{//received barcode from popup
        this.current_step="get_bggid";
        break;
      }
      case 'get_bggid':{
        if(this.has('bgg_id')){
          this.current_step='get_bgginfo';
        }
        else{
          this.current_step='ask_title';
        }
        break;
      }
      case 'ask_title':{
        this.current_step='search_bgg_by_title';
        break;
      }
      case 'search_bgg_by_title':{
        if(this.has('bgg_id')){
          this.current_step='get_bgginfo';
        }
        else{
          this.current_step='select_bgg_options';
        }
        break;
      }
      case 'select_bgg_options':{
        this.current_step='get_bgginfo';
        break;
      }
      case 'get_bgginfo':{
        this.current_step='get_owner';
        break;
      }
      case 'get_owner':{
        if(this.has('selected_owner')){
          this.current_step='add_owner';
        }
        else{
          this.current_step='create_owner';
        }
        break;
      }
      case 'create_owner':{
        this.current_step='add_owner';
        break;
      }
      case 'add_owner':{
        this.current_step='end';
        break;
      }
      case 'error':
      case 'abort':{
        break;
      }
      default:{
        this.error("Unknown state reached");
        break;
      }
    }
    report+=" -> "+this.current_step;
    console.log(report);
    this.proces_step();
  }

  public override init(){
    this.current_step="start";
    this.proces_step();
  }

  public override async proces_step() {
    switch(this.current_step){
      case 'start':{
        this.next();
        return;
      }
      case 'get_barcode':{
        this.showPopup(PopupIdentifier.BARCODE_INPUT,[],["barcode"],[]);
        return;
      }
      case 'get_bggid':{
        let result=await BARCODES.get_bggid(this.get("barcode"));
        if(result.bggid !== undefined){
          this.storeData("bgg_id",result.bggid);
          this.storeData("bgg_id_source",result.source);
        }
        this.next();
        return;
      }
      case 'ask_title':{
        this.showPopup(PopupIdentifier.TEXT_INPUT,["Game Title :"],["search_title"],[]);
        return;
      }
      case 'search_bgg_by_title':{
        let searchresults=(await http_utils.search_bgg_by_title(this.get("search_title"))).sdata;
        if(searchresults.length==0){
          this.error("No results found for title search");
        }
        else if(searchresults.length==1){
          this.storeData("bgg_id",searchresults[0].bgg_id);
          this.storeData("bgg_id_source",SourceID.EXT_API);
        }
        else{
          this.storeData("bgg_search_result",searchresults);
        }
        this.next();
        return;
      }
      case 'select_bgg_options':{
        let searchresults: BggSearchResult[]=this.get('bgg_search_result');
        if(searchresults===undefined){
          this.error("Missing value bgg_search_result");
          this.next();
          return;
        }
        this.storeData("bgg_id_source",SourceID.EXT_API);
        var options:Option_t[]=searchresults.map((x)=>{return {val:x.bgg_id,label:x.bgg_name + " (" + x.bgg_year + ")"};});
        this.showPopup(PopupIdentifier.CHOICE_INPUT,["Select the correct game :"],["bgg_id"],options);
        return
      }
      case 'get_bgginfo':{
        BARCODES.add_entry(this.get("barcode"),this.get("bgg_id"));
        let result= await BGG.get_bgginfo(this.get("bgg_id"));
        if(result.info===undefined){
          this.error("Failed to retrieve BGG info for bgg_id " + this.get("bgg_id"));
        }
        else{
          this.storeData("bgg_info",result.info);
          this.storeData("bgg_info_source",result.source);
          if(result.info.title_show!==undefined){
            this.storeData("box_show_title",result.info.title_show);
          }
          else{
            this.showPopup(PopupIdentifier.TEXT_INPUT,["Insert Title to Show :"],["box_show_title"],[]);
            return;
          }
        }
        this.next();
        return;
      }
      case 'get_owner':{
        let binfo:BggInfo=this.get("bgg_info");
        if(binfo.title_show===undefined){
          binfo.set_show_title(this.get("box_show_title"));
        }
        this.showPopup(PopupIdentifier.CHOICE_CREATE_INPUT,["Select Owner:"],["selected_owner"],OWNERS.getOptions());
        return;
      }
      case 'create_owner':{
        this.showPopup(PopupIdentifier.TEXT_INPUT,["Enter new Owner name :"],["selected_owner"],[]);
        return;
      }
      case 'add_owner':{
        OWNERS.add_entry(this.get("selected_owner"));
        let box=new BggBox({box_bgg_id:this.get('bgg_id'), box_owner:this.get('selected_owner')});
        EV_BOXES.add_box(box);
        this.next();
        return;
      }
      case 'end':{
        this.reset();
        return;
      }
      case 'error':
      case 'abort':
      default:
      this.reset();
      return;
    }
  }


}
