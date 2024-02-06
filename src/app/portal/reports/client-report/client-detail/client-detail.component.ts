import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { AddOrderBasicDetail } from 'src/app/library/core/models/add-order-basic-detail.model';
import { AddBasicDetailOfClient } from 'src/app/library/core/models/report/clientReport/addBasicDetailOfClient.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  requestForm: FormGroup; 
  addForm : FormGroup;
  requestId : number;
  OrderReportDetailLookups:any;
  constructor(readonly service: ClientService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,readonly authService: AuthService,
    private router: Router) { }

    ngOnInit(): void {
      this.requestId = this.route.snapshot.params.id;
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
        this.service.constants.MasterCategories.StatusMaster,
  
  
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
            
        //     const requestContainer = new AddBasicDetailOfClient(response.data[0]);
        //     this.requestForm = this.formBuilder.formGroup(requestContainer);
        //     // this.getCurrentStatusValue();
  
        //     // this.addForm = new FormGroup({
        //     //   file: new FormControl(null, Validators.required),
        //     // });
        //   }
  
        // });
      } else {
        const requestContainer = new AddBasicDetailOfClient();
        this.requestForm = this.formBuilder.formGroup(requestContainer);

      }
    }
  saveNotes(){

  }
  onCancel(){
    this.router.navigate(['/ClientReport'])
  }
  onSave(){
  //  if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("this is a container",container);

      this.service.saveClient(container).subscribe((response:any)=>{
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
   // }else{
      console.log("its not valide form");
    }
 // }
}
