import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { StockCMService } from '../stock-cm.service';
import { AddBasicDetailOfStock } from 'src/app/library/core/models/report/stockReport/stock-basic-detail.model';
StockCMService
@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  requestForm: FormGroup; 
  addForm : FormGroup;
  requestId : number;
  OrderReportDetailLookups:any;
  StockItem : Array<any>;
  constructor(readonly service: StockCMService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,readonly authService: AuthService,
    private routeUrl: Router) { }

    ngOnInit(): void {
      this.requestId = this.route.snapshot.params.id;
      this.bindDropdowns();
    }

    bindDropdowns() {
      const categories = [
        this.service.constants.MasterCategories.RoleMaster,
      //  this.service.constants.MasterCategories.ClientMaster,
     //   this.service.constants.MasterCategories.WorkTypeMaster,
    //  this.service.constants.MasterCategories.ProductMaster,
        this.service.constants.MasterCategories.SizeMaster,
    //    this.service.constants.MasterCategories.DesignMaster,
     //   this.service.constants.MasterCategories.StatusMaster,
        this.service.constants.MasterCategories.StockItemMaster,
        this.service.constants.MasterCategories.ColourMaster
  
      ];
      this.service.getLookups(categories, (lookups:any) => {
         this.OrderReportDetailLookups = lookups;
        // this.initialize();
        console.log("this is a Lokkups",lookups);
        this.initialize();
        // this.WorkTypeArray = lookups[this.service.constants.MasterCategories.WorkTypeMaster];
        // this.ClietMaster = lookups[this.service.constants.MasterCategories.ClientMaster];
        // this.ProductMaster = lookups[this.service.constants.MasterCategories.ProductMaster];
        // this.SizeMaster = lookups[this.service.constants.MasterCategories.SizeMaster];
        // this.DesignMaster = lookups[this.service.constants.MasterCategories.DesignMaster];
        // this.StatusMaster = lookups[this.service.constants.MasterCategories.StatusMaster];
  
      });
      
    }
    obj : any
    initialize() {
      if (this.requestId) {
        console.log("its in request ID");
        let obj = {
          "OrderId":this.requestId
        }
        // this.service.getOrderDetailById(obj).subscribe((response: any) => {
        //   if (response.status === 200 && response.data) {
        //     // this.obj = {
        //     //   assignedManpowerList  : response.data.assignedManpowerList,
        //     //   request :response.data.request,
        //     // }
        //     // if(response.data.request.enquiryStatus == "21")
        //     // {
        //     //   response.data.request.isModifyBy = 0;
        //     //}
            
        //     const requestContainer = new AddOrderBasicDetail(response.data[0]);
        //     this.requestForm = this.formBuilder.formGroup(requestContainer);
        //     // this.getCurrentStatusValue();
  
        //     // this.addForm = new FormGroup({
        //     //   file: new FormControl(null, Validators.required),
        //     // });
        //   }
  
        // });
      } else {
        const requestContainer = new AddBasicDetailOfStock();
        this.requestForm = this.formBuilder.formGroup(requestContainer);

      }
    }
  saveNotes(){

  }
  onCancel(){
this.routeUrl.navigate(["/StockReport"])
  }
  onSave(){
   if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("this is a container",container);

      this.service.addStock(container).subscribe((response:any)=>{
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
   }else{
      console.log("its not valide form");
    }
  }

}
