import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { OrderAssignModel } from 'src/app/library/core/models/report/orderAssign/order_assign.model';
import { OrderAssignMainModel } from 'src/app/library/core/models/report/orderAssign/order_assign_main.model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { RequestService } from 'src/app/portal/service-request/request/request.service';

@Component({
  selector: 'app-assign-task-detail-dialog',
  templateUrl: './assign-task-detail-dialog.component.html',
  styleUrls: ['./assign-task-detail-dialog.component.scss']
})
export class AssignTaskDetailDialogComponent implements OnInit {
  dialog: any;

  constructor(readonly service: RequestService, readonly formBuilder: RxFormBuilder,public dialogRef: MatDialogRef<AssignTaskDetailDialogComponent>) { }
  sparesConsumablesForm: FormGroup;
  serviceSubCategories: Array<any>;
  manager: Array<any>;
  requestDetailLookups: any;
 loginUser : any
  ngOnInit(): void {
    this.bindDropdowns();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  bindDropdowns() {
    const categories = [
      this.service.constants.OrderReportCategories.ManagerMaster,
      this.service.constants.OrderReportCategories.EmployeeMaster,

    ]
    this.service.getLookups(categories, (lookups) => {
      this.requestDetailLookups = lookups;
      console.log("Look Up --", this.requestDetailLookups);

      this.initialize();
    });
  }
  cancel(){
   this.dialog.closeAll();
  }
  initialize() {
    if(this.loginUser.roleId == 1){
      this.manager = this.requestDetailLookups[this.service.constants.OrderReportCategories.ManagerMaster];
    }else{
      
    this.manager = this.requestDetailLookups[this.service.constants.OrderReportCategories.EmployeeMaster];
    }
    console.log(this.manager);
    const sparesConsumableList = new OrderAssignModel();
    this.sparesConsumablesForm = this.formBuilder.formGroup(sparesConsumableList);
    // console.log("Form --", this.sparesConsumablesForm.controls.get('request'));
  }

  save() {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (this.sparesConsumablesForm.valid) {
      const taskType = this.sparesConsumablesForm.getRawValue();
      console.log("All data --", taskType);
      var obj = this.manager.find(x => x.KeyName == taskType.assignToId);
      taskType.assignEmployeeName = obj.DisplayText;
      taskType.assignById = json.id;
      taskType.tblId = 0;
      taskType.isDelete = 0;
      this.dialogRef.close(taskType);
    }

  }

}
