import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ManpowerTaskTimeList } from 'src/app/library/core/models/service-request/manpower-taskTimeList-model';
import { ManpowerService } from '../manpower.service';

@Component({
  selector: 'app-manpower-task-time',
  templateUrl: './manpower-task-time.component.html',
  styleUrls: ['./manpower-task-time.component.scss']
})
export class ManpowerTaskTimeComponent implements OnInit {
  manpowerTaskTimeForm: FormGroup;

  @Input() requestForm: FormGroup;
  EmployeeArr: Array<any>;
  serviceSubCategories: Array<any>;
  filteredSubCategories: Array<any>;

  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: ManpowerService,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: number,assignedManpowerList:any },
    public dialogRef: MatDialogRef<ManpowerTaskTimeComponent>) { }

  ngOnInit(): void {
    console.log(this.data.assignedManpowerList);
    this.bindDropdowns();
    this.initialize();
    this.EmployeeArr = this.data.assignedManpowerList;
console.log(this.EmployeeArr);
  }

  bindDropdowns() {
    // console.log(this.requestForm);
  }

  initialize() {
    const manpowerTaskTimeList = new ManpowerTaskTimeList();
    this.manpowerTaskTimeForm = this.formBuilder.formGroup(manpowerTaskTimeList);
  }

  

  addManpowerTaskTime() {
    if (this.manpowerTaskTimeForm.valid) {
      const taskType = this.manpowerTaskTimeForm.getRawValue();
      console.log('taskType');
      console.log(taskType);


      taskType.employeeName =taskType.employeeId.employeeName;
      taskType.employeeId = taskType.employeeId.employeeId;
      taskType.startTime = taskType.startTime;


      this.dialogRef.close(taskType);
    } else {
      this.manpowerTaskTimeForm.markAllAsTouched();
      this.service.notify.showDefaultError();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
