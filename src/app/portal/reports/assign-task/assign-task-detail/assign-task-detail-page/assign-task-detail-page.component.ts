import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EnquiryTaskLine } from 'src/app/library/core/models/service-request/enquiry-task-line.model';
import { SparesConsumableList } from 'src/app/library/core/models/service-request/spares-correspondenceList-model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { SparesConsumablesComponent } from 'src/app/portal/service-request/request/task-details/spares-consumables/spares-consumables.component';
import { TaskDetailsService } from 'src/app/portal/service-request/request/task-details/task-details.service';
import { TaskTypeComponent } from 'src/app/portal/service-request/request/task-details/task-type/task-type.component';
import { AssignTaskDetailDialogComponent } from './assign-task-detail-dialog/assign-task-detail-dialog.component';
import { OrderAssignModel } from 'src/app/library/core/models/report/orderAssign/order_assign.model';

@Component({
  selector: 'app-assign-task-detail-page',
  templateUrl: './assign-task-detail-page.component.html',
  styleUrls: ['./assign-task-detail-page.component.scss']
})
export class AssignTaskDetailPageComponent implements OnInit {

  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  type: any;
  showaddbutt: any = false;
  Spareshowaddbutt: any = false;
  Openingaddbutt: any = true;
  ActualTaskTypeDelete: any = true;
  constructor(readonly service: TaskDetailsService,
    readonly formBuilder: RxFormBuilder, readonly authService: AuthService,
    readonly dialog: MatDialog) { }
  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');


    if (json.roleId === 1) {
      console.log(json.roleId);
    }

    console.log("Request Form --", this.requestForm);

    // if (this.requestForm.controls.request.get('enquiryStatus')?.value == 2 && this.requestForm.controls.assignedManpowerList?.value.length != 0) {
    //   this.showaddbutt = true;
    // }

    // if (this.requestForm.controls.manpowerTaskTimeList?.value.length > 0 || this.requestForm.controls.request.get('enquiryStatus')?.value == 25) {
    //   this.Openingaddbutt = false;
    // }

    // if (this.requestForm.controls.request.get('enquiryStatus')?.value == 25 || this.requestForm.controls.request.get('enquiryStatus')?.value == 21 || this.requestForm.controls.request.get('enquiryStatus')?.value == 3) {
    //   this.ActualTaskTypeDelete = false;;
    // }

    console.log(this.Openingaddbutt);

    // if (this.requestForm.controls.request.get('enquiryStatus')?.value != 21) {
    //   this.Spareshowaddbutt = true;
    // }

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
    // if (this.requestForm.controls.assignedManpowerList?.value.length != 0) {
    // const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
    // const request = this.requestForm.controls.request as FormArray;
    // if (serviceId) {
    const dialogRef = this.dialog.open(AssignTaskDetailDialogComponent, {
      data: {},
      // enquiryTaskLines: request 
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addSparesConsumables(result);
      }
    });
    // } else {
    //   this.service.notify.showError('Please select Service in Service Request Details');
    // }
    // } else {
    //   this.service.notify.showError("Can't Add Materials, No Manpower has been Assigned yet.");
    // }

  }

  addSparesConsumables(taskType: OrderAssignModel) {
    const sparesConsumableLists = this.requestForm.controls.request as FormArray;
    if (taskType) {
      const newTaskType = new OrderAssignModel(taskType);
      newTaskType.assignById = taskType.assignById;
      newTaskType.assignToId = taskType.assignToId;
      //newTaskType.itemName = taskType.itemName;
      newTaskType.workRatePerPiece = taskType.workRatePerPiece;
      newTaskType.assignTotalPiece = taskType.assignTotalPiece;
      newTaskType.isDelete = 0;
      newTaskType.tblId = 0;
      newTaskType.orderId = this.requestId;
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
