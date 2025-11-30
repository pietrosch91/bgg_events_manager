import { Option_t } from "bgg-sql-mngr";

export enum PopupIdentifier {
  NONE = 0,
  BARCODE_INPUT = 1,
  TEXT_INPUT = 2,
  CHOICE_INPUT = 3,
  CHOICE_CREATE_INPUT,
}

export interface PopupData {
  visible_id: PopupIdentifier,
  viewtext: string[],
  varnames: string[],
  options: Option_t[],
  target?: BggProcess,
}

export interface _ProcessEnv_t{
  popups: PopupData,
  hidden_input_active:boolean,
  allow_auto_start:boolean,
}


export const ProcessEnv:_ProcessEnv_t={
  popups: {
    visible_id: PopupIdentifier.NONE,
    viewtext: [],
    varnames: [],
    options: [],
  },
  hidden_input_active:false,
  allow_auto_start:true,
};



export class BggProcess {

  public processName:string="";
  public current_step:string ="inactive";
  public status: Map<string,any>=new Map();
  public process_is_auto:boolean=false;
  public aborting:boolean=false;
  public is_error:boolean=false;
  public err_msg:string="";


  constructor(){}

  public async next(){}

  public async proces_step(){}

  public test_auto_var(name:string): boolean {
    if(!this.process_is_auto) return false;
    let autovalue=this.status.get("auto_"+name);
    if(autovalue==undefined){
      this.status.set(name,autovalue);
      return true;
    }
    return false;
  }

  showPopup(popup_id:PopupIdentifier, viewtext:string[], varnames:string[], options:Option_t[]):void{
    ProcessEnv.popups.viewtext = viewtext;
    ProcessEnv.popups.varnames = varnames;
    ProcessEnv.popups.options = options;
    ProcessEnv.popups.visible_id = popup_id;
    ProcessEnv.popups.target=this;
    ProcessEnv.hidden_input_active = true;
  }

  hidePopup():void{
    ProcessEnv.popups.visible_id = PopupIdentifier.NONE;
    ProcessEnv.popups.viewtext = [];
    ProcessEnv.popups.varnames = [];
    ProcessEnv.popups.options = [];
    ProcessEnv.popups.target=undefined;
    ProcessEnv.hidden_input_active = false;;
  }

  abort(){
    this.aborting=true;
    this.current_step="abort";
  }

  error(msg:string){
    this.is_error=true;
    this.err_msg=msg;
    this.current_step="error";
  }

  init(){}
  reset(){
    this.status.clear();
    this.current_step="inactive";
    this.aborting=false;
    this.is_error=false;
    this.err_msg="";
    this.process_is_auto=false;
  }


  storeData(varname:string, value:any):void{
    this.status.set(varname,value);
  }

  storeAutoData(varname:string, value:any):void{
    this.storeData("auto_"+varname,value);
  }

  hidden_input_refocus():void{
    if(ProcessEnv.hidden_input_active){
      console.log("Refocusing hidden input");
      ProcessEnv.hidden_input_active = false;
      setTimeout(() => {
        ProcessEnv.hidden_input_active = true;
      }, 100);
    }
  }

  public get(name:string){
    return this.status.get(name);
  }

  public has(name:string):boolean{
    return this.status.has(name);
  }


}
