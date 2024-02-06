import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
// import { RequestContainer } from 'src/app/library/core/models/service-request/request-container.model';
import { OrderAssignModel } from 'src/app/library/core/models/report/orderAssign/order_assign.model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { CallRecordingUploadComponent } from 'src/app/portal/service-request/request/call-recording-upload/call-recording-upload.component';
import { RequestService } from 'src/app/portal/service-request/request/request.service';
import { UploadCustomerSignatureComponent } from 'src/app/portal/service-request/request/upload-customer-signature/upload-customer-signature.component';
import { ViewCustomerDetailsComponent } from 'src/app/portal/service-request/request/view-customer-details/view-customer-details.component';
import { ViewImageComponent } from 'src/app/portal/service-request/request/view-image/view-image.component';
import { environment } from 'src/environments/environment';
import { AssignTaskDetailService } from '../assign-task-detail.service';
import { OrderAssignMainModel } from 'src/app/library/core/models/report/orderAssign/order_assign_main.model';

@Component({
  selector: 'app-assign-task-detail',
  templateUrl: './assign-task-detail.component.html',
  styleUrls: ['./assign-task-detail.component.scss']
})
export class AssignTaskDetailComponent implements OnInit {
  requestForm: FormGroup; 
  addForm : FormGroup;
  requestId : number;
  OrderReportDetailLookups:any;
  AssignList : Array<any>;
  constructor(readonly service: AssignTaskDetailService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,readonly authService: AuthService,
    private routeUrl: Router) { }

    ngOnInit(): void {
      this.requestId = parseInt(this.route.snapshot.params.id);
      this.bindDropdowns();
    }

    bindDropdowns() {
      const categories = [
        this.service.constants.MasterCategories.RoleMaster,
        this.service.constants.MasterCategories.ClientMaster,
        this.service.constants.MasterCategories.WorkTypeMaster,
        this.service.constants.MasterCategories.ProductMaster,
        this.service.constants.MasterCategories.SizeMaster,
        this.service.constants.MasterCategories.DesignMaster,
        this.service.constants.MasterCategories.StatusMaster
      ];
      this.service.getLookups(categories, (lookups:any) => {
         this.OrderReportDetailLookups = lookups;
        // this.initialize();
        console.log("this is a Lokkups",lookups);
        // this.WorkTypeArray = lookups[this.service.constants.MasterCategories.WorkTypeMaster];
        // this.ClietMaster = lookups[this.service.constants.MasterCategories.ClientMaster];
        // this.ProductMaster = lookups[this.service.constants.MasterCategories.ProductMaster];
        // this.SizeMaster = lookups[this.service.constants.MasterCategories.SizeMaster];
        // this.DesignMaster = lookups[this.service.constants.MasterCategories.DesignMaster];
        // this.StatusMaster = lookups[this.service.constants.MasterCategories.StatusMaster];
  
      });
      this.initialize();
    }
    obj : any
    initialize() {
      if (this.requestId) {
        console.log("its in request ID");
        let obj = {
          OrderId:this.requestId
        }
        this.service.getAssignListByOrderId(obj).subscribe((response: any) => {
          if (response.status == 200 && response.data) {
            // this.obj = {
            //   // assignedManpowerList: response.data.assignedManpowerList,
            //   request: response.data.request,
            // }
            // if (response.data.request.enquiryStatus == "21") {
            //   response.data.request.isModifyBy = 0;
            // }
  let reqObj = {
    request : response.data
  }
  console.log(reqObj);
            const requestContainer = new OrderAssignMainModel(reqObj);
            console.log("Sahaj")
            this.requestForm = this.formBuilder.formGroup(requestContainer);
            console.log("Request Form1 --", this.requestForm);
  
         //   this.getCurrentStatusValue();
  
            // this.addForm = new FormGroup({
            //   file: new FormControl(null, Validators.required),
            // });
          }
  
        });
      } else {
        const requestContainer = new OrderAssignModel();
        this.requestForm = this.formBuilder.formGroup(requestContainer);
      }
    }
  saveNotes(){

  }
  onCancel(){

  }
  onSave(){
  //  if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("this is a container",container);

      let obj = {
        "AssignTaskTableType": container.request
      }
      console.log(obj)
      this.service.assignTaskToEmployee(obj).subscribe((response:any)=>{
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
   // }else{
      console.log("its not valide form");
    }
 // }
}

