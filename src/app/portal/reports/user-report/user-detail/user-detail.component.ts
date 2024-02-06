import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { AddOrderBasicDetail } from 'src/app/library/core/models/add-order-basic-detail.model';
import { UserService } from '../user.service';
import { BasicDetailOfUser } from 'src/app/library/core/models/report/userReport/BasicDetailOfUser.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  requestForm: FormGroup; 
  addForm : FormGroup;
  requestId : number;
  OrderReportDetailLookups:any;
  constructor(readonly service: UserService,
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
        this.service.constants.MasterCategories.ActiveMaster
  
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
          "UserId":this.requestId
        }
        this.service.getUserDetailById(obj).subscribe((response: any) => {
          if (response.status === 200 && response.data) {
            if(response.data[0].IsActive == true){

              response.data[0].IsActive = 1;
            }else {
              response.data[0].IsActive = 0;
            }
            const requestContainer = new BasicDetailOfUser(response.data[0]);
            this.requestForm = this.formBuilder.formGroup(requestContainer);
          }
  
        });
      } else {
        const requestContainer = new BasicDetailOfUser();
        this.requestForm = this.formBuilder.formGroup(requestContainer);

      }
    }
  saveNotes(){

  }
  onCancel(){
    this.router.navigate(['/WorkerReport'])
  }
  onSave(){
  //  if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("this is a container",container);

      this.service.addUser(container).subscribe((response:any)=>{
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
   // }else{
      console.log("its not valide form");
    }
 // }

}
