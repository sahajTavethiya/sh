import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EnquiryTaskLine } from 'src/app/library/core/models/service-request/enquiry-task-line.model';
import { SparesConsumableList } from 'src/app/library/core/models/service-request/spares-correspondenceList-model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { SparesConsumablesComponent } from './spares-consumables/spares-consumables.component';
import { TaskDetailsService } from './task-details.service';
import { TaskTypeComponent } from './task-type/task-type.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  type: any;
  showaddbutt: any = false;
  Spareshowaddbutt: any = false;
  Openingaddbutt: any = true;
  ActualTaskTypeDelete: any = true;
  constructor(readonly service: TaskDetailsService,
    readonly formBuilder: RxFormBuilder,readonly authService: AuthService,
    readonly dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.requestForm.controls.manpowerTaskTimeList?.value.length);
    if (this.requestForm.controls.request.get('enquiryStatus')?.value == 2 && this.requestForm.controls.assignedManpowerList?.value.length != 0) {
      this.showaddbutt = true;
    }

    if (this.requestForm.controls.manpowerTaskTimeList?.value.length > 0 || this.requestForm.controls.request.get('enquiryStatus')?.value == 25) {
      this.Openingaddbutt = false;
    }

    if (this.requestForm.controls.request.get('enquiryStatus')?.value == 25 || this.requestForm.controls.request.get('enquiryStatus')?.value == 21 || this.requestForm.controls.request.get('enquiryStatus')?.value == 3) {
      this.ActualTaskTypeDelete = false;;
    }

    console.log(this.Openingaddbutt);

    if (this.requestForm.controls.request.get('enquiryStatus')?.value != 21) {
      this.Spareshowaddbutt = true;
    }

  }

  OpeningTask_quantity(index: any, event: any, type: any) {


    const enquiryTaskLines = this.requestForm.controls.enquiryTaskLine as FormArray;
    const row = enquiryTaskLines.at(index);
    if (type == 1) {
      row.get('quantity')?.setValue(Number(event.target.value));
    } else if (type == 3) {
      row.get('actualQuantity')?.setValue(Number(event.target.value));
    } else if (type == 4) {
      row.get('actualPrice')?.setValue(Number(event.target.value));
    }
  }

  spareAndConsumable_quantity(index: any, event: any, price: any) {

    console.log(price);
    console.log(event.target.value);
    const sparesConsumableList = this.requestForm.controls.sparesConsumableList as FormArray;
    const row = sparesConsumableList.at(index);

    row.get('quantity')?.setValue(Number(event.target.value));
    row.get('salePrice')?.setValue(Number(price * event.target.value));
  }


  addOpenTaskDetail(type: any) {
    this.type = type;
    console.log(this.requestForm.controls.request);
    const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
    if (serviceId) {
      const dialogRef = this.dialog.open(TaskTypeComponent, {
        data: { serviceId: parseInt(serviceId) },
        width: '600px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addTaskType(result);
        }
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
    }
  }

  addTaskType(taskType: EnquiryTaskLine) {
    const enquiryTaskLines = this.requestForm.controls.enquiryTaskLine as FormArray;

    const enquiryTaskLinesoldf = enquiryTaskLines.value.filter((subCategory: any) => {
      return subCategory.subCategory === taskType.subCategory;
    });
    console.log(this.type);
    if (enquiryTaskLinesoldf.length == 0) {
      if (taskType) {
        const newTaskType = new EnquiryTaskLine(taskType);
        newTaskType.id = 0;
        newTaskType.enquiryId = this.requestId;
        newTaskType.rowStatus = 1;
        newTaskType.taskType = this.type;
        newTaskType.actualQuantity = taskType.quantity;
        newTaskType.actualPrice = taskType.price;
        newTaskType.total = taskType.price * taskType.quantity;
        newTaskType.actualTotal = taskType.price * taskType.quantity;
        newTaskType.createdBy = this.authService.currentUserValue.id.toString();

        const taskTypeForm = this.formBuilder.formGroup(newTaskType);
        enquiryTaskLines.push(taskTypeForm);
      }
    } else {
      this.service.notify.showSuccess('This Task already exists in the list, You may modify the Task Quantity if required.');
    }

  }

  deleteTaskType(index: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Delete",
        message: "Are you sure to delete!"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const enquiryTaskLines = this.requestForm.controls.enquiryTaskLine as FormArray;
        const row = enquiryTaskLines.at(index);
        if (row.get('id')?.value > 0) {
          row.get('isDeleted')?.setValue(true);
          row.get('rowStatus')?.setValue(4);
        } else {
          enquiryTaskLines.removeAt(index);
        }
      }
    });
  }

  addOpenSparesConsumables() {
    if (this.requestForm.controls.assignedManpowerList?.value.length != 0) {
      const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
      const enquiryTaskLines = this.requestForm.controls.enquiryTaskLine as FormArray;
      if (serviceId) {
        const dialogRef = this.dialog.open(SparesConsumablesComponent, {
          data: { serviceId: parseInt(serviceId),enquiryTaskLines: enquiryTaskLines},
          width: '600px'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.addSparesConsumables(result);
          }
        });
      } else {
        this.service.notify.showError('Please select Service in Service Request Details');
      }
    } else {
      this.service.notify.showError("Can't Add Materials, No Manpower has been Assigned yet.");
    }

  }

  addSparesConsumables(taskType: SparesConsumableList) {
    const sparesConsumableLists = this.requestForm.controls.sparesConsumableList as FormArray;
    if (taskType) {
      const newTaskType = new SparesConsumableList(taskType);
      newTaskType.id = 0;
      newTaskType.enquiryId = this.requestId;
      //newTaskType.itemName = taskType.itemName;
      newTaskType.materialId=taskType.materialId;
      newTaskType.materialName = taskType.materialName;

      const taskTypeForm = this.formBuilder.formGroup(newTaskType);
      sparesConsumableLists.push(taskTypeForm);
    }
  }


  deleteSparesConsumables(index: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Delete",
        message: "Are you sure to delete!"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const sparesConsumableLists = this.requestForm.controls.sparesConsumableList as FormArray;
        const row = sparesConsumableLists.at(index);
        if (row.get('id')?.value > 0) {
          row.get('isDeleted')?.setValue(true);
          row.get('rowStatus')?.setValue(4);
        } else {
          sparesConsumableLists.removeAt(index);
        }
      }
    });
  }


}
