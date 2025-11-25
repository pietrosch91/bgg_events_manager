import { Component, Input, OnInit } from '@angular/core';
import { AutoInputType, getProcessTypeByName, getProcessTypeNames, ProcessEnv, ProcessManagerService, ProcessType } from '../../process-manager.service';
import { OWNERS } from 'bgg-sql-mngr';

@Component({
  selector: 'lib-autoinput',
  standalone: false,
  templateUrl: './autoinput.component.html',
  styleUrl: './autoinput.component.css',
})
export class AutoinputComponent implements OnInit {


    env=ProcessEnv;

     @Input({required:true}) type: AutoInputType =  AutoInputType.BARCODE;

    public focus: boolean = true;
    public options: any[] = [];
    public varname: string="";
    public varval: any;

    public AutoInputType = AutoInputType;
    public ProcessType = ProcessType;

    re_focus(){
      this.focus = false;
      setTimeout(()=>{
        console.log("refocusing");
        this.focus = true;
      },1000);
    }

    constructor(private pm:ProcessManagerService) {}

    ngOnInit(): void {
      switch(this.type){
        case AutoInputType.PROCESS:
          this.varname="auto_process";
          this.options=getProcessTypeNames();
          this.pm.storeAutoData(this.varname, getProcessTypeByName(this.options[0]));
          break;
        case AutoInputType.BARCODE:
          this.re_focus();
          this.varname="auto_barcode";
          break;
        case AutoInputType.OWNER:
          this.options=OWNERS.getOptions();
          console.log("Hidden Input OWNRE INIT");
          console.log(this.options);
          this.varname="auto_selected_owner";
          this.pm.storeAutoData(this.varname, this.options[0].label);
          break;
      }
    }

    //event functions
    BARCODE_input_change(arg0: string) {
      this.varval = arg0;
    }
    BARCODE_key_pressed($event: KeyboardEvent) {
      // console.log($event.key);
      if($event.key === "Enter" || $event.key === "CarridgeReturn"){
        //console.log("I'm here");
        if(this.varval.trim() == ""){
        }
        else {
          this.pm.storeAutoData(this.varname, this.varval);
          this.pm.autostart();
        }
      }
    }

    DEFAULT_input_change(arg0: string) {
      this.varval = arg0;
      this.pm.storeAutoData(this.varname, this.varval);
    }

    PROCESS_input_change(arg0: string) {
      this.varval = arg0;
      this.pm.storeAutoData(this.varname, getProcessTypeByName(this.varval));
    }



}
