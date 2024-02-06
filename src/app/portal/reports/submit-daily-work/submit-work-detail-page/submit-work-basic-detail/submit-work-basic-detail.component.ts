import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AddSubmitWorkDetailPopupComponent } from './add-submit-work-detail-popup/add-submit-work-detail-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SubmitWorkService } from '../../submit-work.service';
import { DailyWorkBasicDetail } from 'src/app/library/core/models/report/dailyWork/daily-work-basic-detail.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-submit-work-basic-detail',
  templateUrl: './submit-work-basic-detail.component.html',
  styleUrls: ['./submit-work-basic-detail.component.scss']
})
export class SubmitWorkBasicDetailComponent implements OnInit {
  @Input() requestForm: FormGroup;
  @Input() AssignList: Array<any>;
  constructor(readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, readonly service: SubmitWorkService,) { }

  ngOnInit(): void {
  }
  addOpenSaveDailyWork() {
    const dialogRef = this.dialog.open(AddSubmitWorkDetailPopupComponent, {
      data: { AssignList: this.AssignList },
      width: '6000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.addManpowerTaskTime(result);
      }
    });
  }
  addManpowerTaskTime(taskTime: DailyWorkBasicDetail) {
    const DailyWorkBasicDetails = this.requestForm.controls.DailyWorkBasicDetail as FormArray;

    console.log('taskTime11');
    console.log(taskTime);
    if (taskTime) {
      const newTaskTime = new DailyWorkBasicDetail(taskTime);

      const taskTimeForm = this.formBuilder.formGroup(newTaskTime);
      DailyWorkBasicDetails.push(taskTimeForm);
    }
  }
  deleteDailyWork(taskTypeId: any, index: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Delete",
        message: "Are you sure to delete!"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const assignedManpowerLists = this.requestForm.controls.DailyWorkBasicDetail as FormArray;
        console.log("asssd--", assignedManpowerLists);

        const row = assignedManpowerLists.at(index);
        if (row.get('tblId')?.value > 0) {
          row.get('isDelete')?.setValue(1);
          // assignedManpowerLists.removeAt(index);

          // row.get('rowStatus')?.setValue(4);
        } else {
          assignedManpowerLists.removeAt(index);
        }
      }
    });
  }
}
