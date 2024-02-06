import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EnquiryTaskLine } from 'src/app/library/core/models/service-request/enquiry-task-line.model';
import { environment } from 'src/environments/environment';
import { RequestDetailService } from '../../request/request-detail/request-detail.service';
import { RequestService } from '../../request/request.service';

@Component({
  selector: 'app-sr-list-update',
  templateUrl: './sr-list-update.component.html',
  styleUrls: ['./sr-list-update.component.scss']
})
export class SrListUpdateComponent implements OnInit {
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  updateSR: FormGroup;
  apiUrl: string = environment.apiUrl;
  EmployeeArr = [{id:'GasStatus',name:'Gas Status'},{id:"EnquiryStatus",name:'Enquiry Status'},{id:"PreferredDate",name:'Preferred Date'},{id:"Description",name:'Calling Remark'},{id:'Priority',name:'Priority'}]
  GasStatus = false;
  EnquiryStatus = false;
  PreferredDate = false;
  Description = false;
  Priority = false;
  isEnquiryStatus = true;
  PlanMasteArr :any;
  ServiceStageMasterArr :any;
  ServicePriorityArr :any;
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service1: RequestService,
    readonly service: RequestDetailService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { enquiryData: any ,type: any},
    public dialogRef: MatDialogRef<SrListUpdateComponent>) { }

  ngOnInit(): void {

    console.log("In 1-",this.data.type);
    if(this.data.type == 1 ){
      
      
      if(this.data.enquiryData[0].enquiryStatusId != 5){
        this.EmployeeArr = [{id:'GasStatus',name:'Gas Status'},{id:"PreferredDate",name:'Preferred Date'},{id:"Description",name:'Calling Remark'},{id:'Priority',name:'Priority'}]
      }
      this.updateSR = this.fb.group({
        dropdownID: [null],
        enquiryStatus: [this.data.enquiryData[0].enquiryStatusId],
        gasStatus: [this.data.enquiryData[0].planId],
        priority: [this.data.enquiryData[0].priorityId],
        preferredDate: [this.data.enquiryData[0].preferredDate!= null ?this.service.Moment(this.data.enquiryData[0].preferredDate).format("YYYY-MM-DD"): null],
        callingRemark: [this.data.enquiryData[0].description],
      });
    }else{
      this.vall(this.data.enquiryData);
     
      
    }
    
    

    this.detectValueChanges();
    this.bindDropdowns();
  }

  vall(enquiryData:Array<any>){    
    enquiryData.forEach(element => {
      if(element.enquiryStatusId == 26 || element.enquiryStatusId == "26"){
        this.isEnquiryStatus = false;
      }      
    });
    this.updateSR = this.fb.group({
      dropdownID: [null],
      enquiryStatus: [null],
      gasStatus: [null],
      priority: [null],
      preferredDate: [null],
      callingRemark: [null],
    });
    if(!this.isEnquiryStatus){
      this.EmployeeArr = [{id:'GasStatus',name:'Gas Status'},{id:"PreferredDate",name:'Preferred Date'},{id:"Description",name:'Calling Remark'},{id:'Priority',name:'Priority'}]
    }

  }
  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.ServiceStageMaster,
      this.service.constants.MasterCategories.PlanMaster,
      this.service.constants.LookupCategories.ServicePriority,
    ];
    this.service.getLookups(categories, (lookups) => {
      this.PlanMasteArr = lookups[this.service.constants.MasterCategories.PlanMaster];
      const serviceStages = lookups[this.service.constants.MasterCategories.ServiceStageMaster];
      this.ServicePriorityArr = lookups[this.service.constants.LookupCategories.ServicePriority];
      this.ServiceStageMasterArr = this.service.getStatusDropdownValuesForSRList(this.data.enquiryData[0].enquiryStatusId, serviceStages,this.data.enquiryData[0].serviceId);
      
      

    });
  }

  detectValueChanges() {
    this.updateSR.get('dropdownID')?.valueChanges
      .subscribe(selectedValue => {
        this.GasStatus = selectedValue == 'GasStatus'?true:false;
        this.EnquiryStatus = selectedValue == 'EnquiryStatus'?true:false;
        this.PreferredDate = selectedValue == 'PreferredDate'?true:false;
        this.Description = selectedValue == 'Description'?true:false;
        this.Priority = selectedValue == 'Priority'?true:false;
      
      });
  }

  editSR(){
    const updateSR = this.updateSR.getRawValue();
    let workerIds = this.data.enquiryData.map((column: { [x: string]: any; })=>{
      return column['enquiryId']
  })

    let data = {
      enquiryId :workerIds,
      planId: updateSR.gasStatus,
      enquiryStatus: updateSR.enquiryStatus,
      preferredDate: updateSR.preferredDate == '' ?null :updateSR.preferredDate,
      description: updateSR.callingRemark,
      priority: updateSR.priority,
    }
    this.service1.srListUpdate(data).subscribe((response: any) => {
      if (response.status == 'success') {
        this.service.notify.showSuccess('Service Request Edit successfully');
        this.dialogRef.close();
      } else {
        this.service.notify.showSuccess(response.error);
        // response.errors.forEach((keys: any, vals: any) => {
        //   console.log(keys.errorMessage);
        //   this.service.notify.showSuccess(keys.errorMessage);
        // });
      }
    });
  }

 

  cancel() {
    this.dialogRef.close();
  }
}
