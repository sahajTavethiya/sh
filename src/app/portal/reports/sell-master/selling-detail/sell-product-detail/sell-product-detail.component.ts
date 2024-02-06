import { ProductionDetailPopUpComponent } from '../../../production/production-detail/production-basic-detail/production-detail-pop-up/production-detail-pop-up.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DailyWorkBasicDetail } from 'src/app/library/core/models/report/dailyWork/daily-work-basic-detail.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AddSubmitWorkDetailPopupComponent } from '../../../submit-daily-work/submit-work-detail-page/submit-work-basic-detail/add-submit-work-detail-popup/add-submit-work-detail-popup.component';
import { SubmitWorkService } from '../../../submit-daily-work/submit-work.service';
import { ProductionBasicDetail } from 'src/app/library/core/models/report/prodcution/production-basic-report.model';
import { SellProductDetail } from 'src/app/library/core/models/report/sellingReport/sellProductDetail.model';
import { SellService } from '../../sell.service';
@Component({
  selector: 'app-sell-product-detail',
  templateUrl: './sell-product-detail.component.html',
  styleUrls: ['./sell-product-detail.component.scss'],
})
export class SellProductDetailComponent implements OnInit {
  @Input() requestForm: FormGroup;
  @Input() lookups: any;
  addUserForm: FormGroup;
  sellingId: any;
  ShowAddDataField: Array<any>;
  showExtended = false;
  ProductMaster: Array<any>;
  DesignMaster: Array<any>;
  ColourMaster: Array<any>;
  StatusMaster: Array<any>;
  SizeMaster: Array<any>;
  HSN_CodeMaster: Array<any>;
  selectedWorkType: number = 1;
  MeasurementMaster: Array<any>;
  AvailableItem: Array<any>;
  HSN_Master : Array<any>;
  constructor(
    readonly formBuilder: RxFormBuilder,
    readonly route: ActivatedRoute,
    private routeUrl: Router,
    readonly service: SellService,
    readonly dialog: MatDialog
    , private FormMaker: RxFormBuilder
  ) {
    const userService = new SellProductDetail();
    this.addUserForm = this.formBuilder.formGroup(userService);
  }

  ngOnInit(): void {
    this.sellingId = parseInt(this.route.snapshot.params.id);
    if (this.sellingId) {
      this.showExtended = true;
    } else {
      this.showExtended = false;
    }
    this.ShowAddDataField = [
      {
        billNo: '',
        invoiceDate: '',
        basicValueRS: '',
        grossValueRS: '',
        action: '',
      },
    ];
    this.DesignMaster =
      this.lookups[this.service.constants.MasterCategories.DesignMaster];
    this.ProductMaster =
      this.lookups[this.service.constants.MasterCategories.ProductMaster];
    this.SizeMaster =
      this.lookups[this.service.constants.MasterCategories.SizeMaster];
    this.ColourMaster =
      this.lookups[this.service.constants.MasterCategories.ColourMaster];
    this.HSN_Master =
      this.lookups[this.service.constants.MasterCategories.HSN_Master];
    this.service
      .getCurrentAvailableSellProdcuts()
      .subscribe((response: any) => {
        console.log('this is a available Item', response);
        this.AvailableItem = response.data.listData;
      });
  }
  public get RequestDetail() {
    return this.requestForm.controls.SellProductDetail as FormGroup;
  }
  documentTypeValue: any;
  getDocumentTypeValue(event: any) {
    console.log(event.value);
    this.documentTypeValue = event.value;
  }
  addOpenSaveDailyWork() {
    const dialogRef = this.dialog.open(ProductionDetailPopUpComponent, {
      data: { AssignList: this.lookups },
      width: '6000px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.addManpowerTaskTime(result);
      }
    });
  }

  ChangeColourMaster() {
    let data = this.addUserForm.getRawValue();
    console.log("this is a AvailableItem",this.AvailableItem);
    
    if(data.productId != null && data.colourId != null && data.sizeId != null && data.designId != null ){
      let AvailableItemObj = this.AvailableItem.find(
        (x) => (x.ProductId == this.addUserForm.get('productId')?.value && x.DesignId == this.addUserForm.get('designId')?.value
         && x.SizeId == this.addUserForm.get('sizeId')?.value && x.ColourId == this.addUserForm.get('colourId')?.value)
      );
      if(AvailableItemObj){
        this.addUserForm.get('qty')?.setValue(AvailableItemObj.QTY)
      }else{
    //    this.service.notify.showSuccess("There is no item available for sell")
        this.addUserForm.get('qty')?.setValue("No Item Availabe") 
      }
    }
  }
  addManpowerTaskTime(taskTime: ProductionBasicDetail) {
    const ProductionBasicDetail1 = this.requestForm.controls
      .ProductionBasicDetail as FormArray;
    if (taskTime) {
      const newTaskTime = new ProductionBasicDetail(taskTime);

      const taskTimeForm = this.formBuilder.formGroup(newTaskTime);
      ProductionBasicDetail1.push(taskTimeForm);
    }
  }
  deleteDailyWork(index: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: 'Delete',
        message: 'Are you sure to delete!',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const assignedManpowerLists = this.requestForm.controls.SellProductDetail as FormArray;

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
  isInputVisible: boolean = false;
  onCancel() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: 'Confirmation',
        message: 'Do you want to cancel your changes?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isInputVisible = false;
      }
    });
  }
  onSubmit() {
    if (this.addUserForm.valid) {
      
      const formData = this.addUserForm.getRawValue();
      console.log('Form Datajnsdfjkndfjudhnf', formData);

      if(formData.qty == null || formData.qty == "No Item Availabe"){
        return this.service.notify.showError("QTY is required property.")
      }
      this.addSparesConsumables(formData);
    }else{
      const formData = this.addUserForm.getRawValue();
      console.log('Form Datajnsdfjkndfjudhnf123', formData);
      if(formData.productId == null){
        return this.service.notify.showError("Product is required property.")
      }      
      if(formData.designId == null){
        return this.service.notify.showError("Design is required property.")
      }
      if(formData.sizeId == null){
        return this.service.notify.showError("Size is required property.")
      }
      if(formData.colourId == null){
        return this.service.notify.showError("Colour is required property.")
      }
      if(formData.qty == null || formData.qty == "No Item Availabe"){
        return this.service.notify.showError("QTY is required property.")
      }
    }
  }
  addInputFields() {
    this.isInputVisible = true;
    console.log('isInputVisible: ', this.isInputVisible);
  }

  // addOpenSparesConsumables(tblId: any): void {
  //   console.log('Requestformrfgdjfighrf --', this.requestForm);
  //   if (tblId !== 0) {
  //     const dialogRef = this.dialog.open(ContractComplianceDialogComponent, {
  //       width: '600px',
  //       data: {
  //         formGroup: this.RequestDetail,
  //         reqForm: this.requestForm,
  //         tblId: tblId,
  //       },
  //     });
  //     dialogRef.afterClosed().subscribe((data: any) => {
  //       if (data != null) {
  //         console.log('this is a after Close.', data);
  //         this.addSparesConsumables(data);
  //       }
  //     });
  //   } else {
  //     const dialogRef = this.dialog.open(ContractComplianceDialogComponent, {
  //       width: '600px',
  //       data: {
  //         formGroup: this.RequestDetail,
  //         reqForm: this.requestForm,
  //         tblId: null,
  //       },
  //     });
  //     dialogRef.afterClosed().subscribe((data: any) => {
  //       if (data != null) {
  //         console.log('this is a after Close.', data);
  //         this.addSparesConsumables(data);
  //       }
  //     });
  //   }
  // }

  addSparesConsumables(taskType: SellProductDetail) {
    
     const addBillDetail = this.requestForm.controls.SellProductDetail as FormArray;
     const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log("its in taskType");
    
     if (taskType) {
     const newTaskType = new SellProductDetail(taskType);
     newTaskType.productId = taskType.productId;
     newTaskType.productName = this.ProductMaster.find((x:any)=>x.KeyName == taskType.productId).DisplayText;

     newTaskType.designName = this.DesignMaster.find((x:any)=>x.KeyName == taskType.designId).DisplayText;
     newTaskType.designId = taskType.designId;
     newTaskType.sizeId = taskType.sizeId || 0;
     newTaskType.sizeName = this.SizeMaster.find((x:any)=>x.KeyName == taskType.sizeId).DisplayText;

     newTaskType.colourId = taskType.colourId || 0;
     newTaskType.colourName = this.ColourMaster.find((x:any)=>x.KeyName == taskType.colourId).DisplayText;
     newTaskType.qty = taskType.qty;
     newTaskType.isDelete = taskType.isDelete || 0;
     newTaskType.hsnCode = this.HSN_Master.find((x:any)=>x.KeyName == taskType.hsnCodeId).DisplayText;
     newTaskType.hsnCodeId = taskType.hsnCodeId;  
     const taskTypeForm = this.FormMaker.formGroup(newTaskType);
     addBillDetail.push(taskTypeForm);
     console.log(this.requestForm.controls.SellProductDetail);
     
     this.isInputVisible = false;
     this.addUserForm.reset(); 
    }

     
     }
}
