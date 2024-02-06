import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DailyWorkBasicDetail } from 'src/app/library/core/models/report/dailyWork/daily-work-basic-detail.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AddSubmitWorkDetailPopupComponent } from '../../../submit-daily-work/submit-work-detail-page/submit-work-basic-detail/add-submit-work-detail-popup/add-submit-work-detail-popup.component';
import { SubmitWorkService } from '../../../submit-daily-work/submit-work.service';
import { ProductionDetailPopUpComponent } from './production-detail-pop-up/production-detail-pop-up.component';
import { ProductionBasicDetail } from 'src/app/library/core/models/report/prodcution/production-basic-report.model';
@Component({
  selector: 'app-production-basic-detail',
  templateUrl: './production-basic-detail.component.html',
  styleUrls: ['./production-basic-detail.component.scss']
})
export class ProductionBasicDetailComponent implements OnInit {
  @Input() requestForm: FormGroup;
  @Input() lookups: any;
  constructor(readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, readonly service: SubmitWorkService,) { }

  ngOnInit(): void {
  }
  addOpenSaveDailyWork() {
    const dialogRef = this.dialog.open(ProductionDetailPopUpComponent, {
      data: { AssignList: this.lookups },
      width: '6000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.addManpowerTaskTime(result);
      }
    });
  }
  addManpowerTaskTime(taskTime: ProductionBasicDetail) {
    const ProductionBasicDetail1 = this.requestForm.controls.ProductionBasicDetail as FormArray;
    if (taskTime) {
      const newTaskTime = new ProductionBasicDetail(taskTime);

      const taskTimeForm = this.formBuilder.formGroup(newTaskTime);
      ProductionBasicDetail1.push(taskTimeForm);
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
        const assignedManpowerLists = this.requestForm.controls.ProductionBasicDetail as FormArray;

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
