import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SparesConsumableList } from 'src/app/library/core/models/service-request/spares-correspondenceList-model';
import { RequestService } from '../../request.service';
import { TaskDetailsService } from '../task-details.service';
import { HttpClient } from '@angular/common/http';
import * as  material  from "../../../../../../assets/materialIds.json";
//const material = require("../../../../../../assets/Json/materialIds.json")
@Component({ 
  selector: 'app-spares-consumables',
  templateUrl: './spares-consumables.component.html',
  styleUrls: ['./spares-consumables.component.scss']
})
export class SparesConsumablesComponent implements OnInit {
  sparesConsumablesForm: FormGroup;

  materialMaster: Array<any>;
  serviceSubCategories: Array<any>;
  filteredSubCategories: Array<any>;
   materialIds : any
// materialIds = materialIds.materialIds


  errorMsg : String;
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: TaskDetailsService,
    readonly service1: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: number,enquiryTaskLines:any },
    public dialogRef: MatDialogRef<SparesConsumablesComponent> ,private http: HttpClient) {
      
     }

  ngOnInit(): void {
    this.http.get('../../../../../../assets/materialIds.json').subscribe((data:any) => {
      this.materialIds = data.materialIds;
    });
    this.bindDropdowns();
    this.initialize();
  }



  bindDropdowns() {
    const enquiryTaskLines = this.data.enquiryTaskLines.arrayObject ;
   this.serviceSubCategories=enquiryTaskLines;
    this.service1.getMaterials().subscribe((response: any) => {
      if (response.status === 'success' && response.data) {
        this.materialMaster = response.data;
      }
    });

  }

  initialize() {
    const sparesConsumableList = new SparesConsumableList();
    this.sparesConsumablesForm = this.formBuilder.formGroup(sparesConsumableList);
    this.detectValueChanges();

    this.sparesConsumablesForm.get('unit')?.disable();
    // this.sparesConsumablesForm.get('cost')?.disable();
    // this.sparesConsumablesForm.get('salePrice')?.disable();
  }

  detectValueChanges() {
    this.sparesConsumablesForm.controls.itemCode.valueChanges
      .subscribe((itemCode: any) => {
        if (itemCode) {
          this.filteredSubCategories = this.materialMaster.filter(data => {
            return data.id === itemCode.id;
          });

        } else {
          this.filteredSubCategories = new Array<any>();
        }
        console.log(this.filteredSubCategories);
       // this.sparesConsumablesForm.get('cost')?.setValue(this.filteredSubCategories[0].price);
       // this.sparesConsumablesForm.get('unit')?.setValue(this.filteredSubCategories[0].unit);
        this.sparesConsumablesForm.get('quantity')?.setValue('');
      //  this.sparesConsumablesForm.get('salePrice')?.setValue('');
      });

    // this.sparesConsumablesForm.controls.quantity.valueChanges
    //   .subscribe((itemCode: any) => {
    //     this.onQuantityChange();
    //   });
  }

  // onQuantityChange(): void {
  //   const taskType = this.sparesConsumablesForm.getRawValue();
  //   // console.log(quantity);
  //   let salePrice = (taskType.quantity * taskType.cost);

  //   this.sparesConsumablesForm.get('salePrice')?.setValue(salePrice);
  // }

  addSparesConsumables() {
    if (this.sparesConsumablesForm.valid) {
      const taskType = this.sparesConsumablesForm.getRawValue();
      taskType.itemName = taskType.id.materialName;
    //  debugger;
      taskType.itemCode = taskType.id.id;
      taskType.quantity=taskType.quantity;
      taskType.materialId=taskType.id.id;
      taskType.materialName=taskType.id.materialName;
      taskType.subCategoryName=taskType.subCategoryId?.subCategory;
      taskType.subCategoryId=taskType.subCategoryId?.subCategoryId;
    
      taskType.requestedDate = new Date();
      taskType.materialAddedOn= new Date();
      const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
      taskType.entryBy = json.id;
      taskType.rowStatus = 1;
      taskType.status = 1;
      taskType.isActive = false;
      console.log(this.materialIds);
      console.log(taskType.materialId);
      
      console.log(this.materialIds.indexOf(taskType.materialId));
      
      if(this.materialIds.indexOf(taskType.materialId) !== -1){
        if(taskType.subCategoryName == null){
            this.errorMsg = "Service Sub Category is required";
        }else{
          this.dialogRef.close(taskType);
        }
      }else{
        this.dialogRef.close(taskType);
      }
      
    } else {
      this.sparesConsumablesForm.markAllAsTouched();
      this.service.notify.showDefaultError();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
