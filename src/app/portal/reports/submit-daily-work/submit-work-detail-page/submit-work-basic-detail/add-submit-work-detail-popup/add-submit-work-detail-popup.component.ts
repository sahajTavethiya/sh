import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DailyWorkBasicDetail } from 'src/app/library/core/models/report/dailyWork/daily-work-basic-detail.model';
import { SubmitWorkService } from '../../../submit-work.service';

@Component({
  selector: 'app-add-submit-work-detail-popup',
  templateUrl: './add-submit-work-detail-popup.component.html',
  styleUrls: ['./add-submit-work-detail-popup.component.scss']
})
export class AddSubmitWorkDetailPopupComponent implements OnInit {
  SaveWorkForm: FormGroup;
  EmployeeArr : Array<any>;
  
  constructor(readonly formBuilder: RxFormBuilder, public dialogRef: MatDialogRef<AddSubmitWorkDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { AssignList : Array<any>},readonly service: SubmitWorkService ) { }
  
  ngOnInit(): void {
  this.initialize();
  }
  initialize() {
    this.EmployeeArr = this.data.AssignList.map(function(item) {
      return {
        AssignById: item.AssignEmployeeId,
        AssignEmployeeName: item.AssignEmployeeName
      };
    });

    const manpowerTaskTimeList = new DailyWorkBasicDetail();
    this.SaveWorkForm = this.formBuilder.formGroup(manpowerTaskTimeList);
  }
  cancel() {
    this.dialogRef.close();
  }
  saveData(){
    if (this.SaveWorkForm.valid) {
      const taskType = this.SaveWorkForm.getRawValue();

      let obj = this.data.AssignList.find(x => x.AssignEmployeeId == taskType.userId);
      const currentDate = new Date();
const formattedDate = currentDate.toISOString();
      taskType.employeeName =obj.AssignEmployeeName;
      taskType.employeeId = taskType.employeeId;
      taskType.createdOn = formattedDate;
      if(taskType.employeeId){
        taskType.completedByEmployee = true;        
      }else{
        taskType.completedByEmployee=false;
      }
      taskType.assignTaskMasterId = obj.AssignTaskMasterId;
      taskType.completedByEmployee = true;
      taskType.workRatePerPiece = obj.WorkRatePerPiece,
      taskType.isDelete = 0,
      taskType.tblId = 0 
      this.dialogRef.close(taskType);
    } else {
      this.SaveWorkForm.markAllAsTouched();
      this.service.notify.showDefaultError();
    }
  }
}
