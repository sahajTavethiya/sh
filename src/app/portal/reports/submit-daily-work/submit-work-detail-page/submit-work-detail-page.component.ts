import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { AddOrderBasicDetail } from 'src/app/library/core/models/add-order-basic-detail.model';
import { SubmitWorkService } from '../submit-work.service';
import { RequestContainer } from 'src/app/library/core/models/report/dailyWork/container.model';

@Component({
  selector: 'app-submit-work-detail-page',
  templateUrl: './submit-work-detail-page.component.html',
  styleUrls: ['./submit-work-detail-page.component.scss']
})
export class SubmitWorkDetailPageComponent implements OnInit {

  requestForm: FormGroup; 
  addForm : FormGroup;
  requestId : number;
  OrderReportDetailLookups:any;
  AssignList : Array<any>;
  constructor(readonly service: SubmitWorkService,
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
          OrderId:this.requestId
        }
        this.service.getTotalSubmitWorkDetailByOrderId(obj).subscribe((response: any) => {
          if (response.status === 200 && response.data) {
            let obj = {
              'DailyWorkBasicDetail': response.data 
            }
            console.log("this is a asdfObj",obj)
            const requestContainer = new RequestContainer(obj);
            this.requestForm = this.formBuilder.formGroup(requestContainer);
          };
          this.service.getAssignListByOrderId(obj).subscribe((response:any)=>{
            this.AssignList =  response.data;
          })
        });
      } else {
        const requestContainer = new RequestContainer();
        this.requestForm = this.formBuilder.formGroup(requestContainer);

      }
    }
  saveNotes(){

  }
  onCancel(){
this.routeUrl.navigate(['/DailyWork'])
  }
  onSave(){
  //  if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("this is a container",container);

      let obj = {
        "OrderId":this.requestId,
        "DailyWorkBasicDetail":container
      }
      this.service.saveDailyWork(obj).subscribe((response:any)=>{
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
   // }else{
      console.log("its not valide form");
    }
 // }
}

