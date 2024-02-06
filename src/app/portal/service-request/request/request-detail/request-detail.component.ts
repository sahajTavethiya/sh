import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { RequestDetailService } from './request-detail.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  @Input() lookups: any;
  @Input() obj :any;
  zones: Array<any>;
  serviceGroups: Array<any>;
  serviceNames: Array<any>;
  preferredTimes: Array<any>;
  serviceStatuses: Array<any>;
  completedBy : Array<any>;
  clients: Array<any>;
  priorities: Array<any>;
  replytype: any;
  preferredDateDisabled: any = true;
  MDPEDisabled: any = false;
  employeeList :any;
  employeeName : any;
  ShowCompetedBy = false;
  completedByname:string;
  employeeNames : any=[];
  selectedId :any;
  constructor(readonly service: RequestDetailService) { }

  ngOnInit(): void {

    this.requestForm.controls.request.get('preferredDate')?.setValue(this.requestForm.controls.request.get('preferredDate')?.value != null ? this.service.Moment(this.requestForm.controls.request.get('preferredDate')?.value).format("YYYY-MM-DD") : null)
    this.requestForm.controls.request.get('enquiryDate')?.setValue(this.requestForm.controls.request.get('enquiryDate')?.value != null ? this.service.Moment(this.requestForm.controls.request.get('enquiryDate')?.value).format("YYYY-MM-DD") : null)
    this.requestForm.controls.request.get('gaugeCalibrationValidityFromDate')?.setValue(this.requestForm.controls.request.get('gaugeCalibrationValidityFromDate')?.value != null ? this.service.Moment(this.requestForm.controls.request.get('gaugeCalibrationValidityFromDate')?.value).format("YYYY-MM-DD") : null)
    this.requestForm.controls.request.get('gaugeCalibrationValidityFromTo')?.setValue(this.requestForm.controls.request.get('gaugeCalibrationValidityFromTo')?.value != null ? this.service.Moment(this.requestForm.controls.request.get('gaugeCalibrationValidityFromTo')?.value).format("YYYY-MM-DD") : null)
    this.employeeName =  this.requestForm.controls.request.get('currentZoneId')?.value
    console.log(this.obj);
    

    //this.ShowCompetedBy = false;
    console.log('this.requestForm.controls.request.get');
    console.log(this.requestForm.controls.request.get('serviceId')?.value);
    if(this.requestForm.controls.request.get('serviceId')?.value == 7){
      this.MDPEDisabled = true;
    }
    this.bindDropdowns();
    this.replytype = this.requestForm.controls.request.get('enquiryStatus')?.value == 3 || this.requestForm.controls.request.get('enquiryStatus')?.value == 4 ? true : false;
    this.disableFields();
    this.setEnquiryStatusPermissions();
    this.detectValueChanges();
  }
  detectValueChanges() {
    this.RequestDetail.get('enquiryStatus')?.valueChanges
      .subscribe(selectedValue => {
        console.log(selectedValue);
        this.setEnquiryStatusPermissions();
        this.setReplyTypeValue();
      });
    this.RequestDetail.get('stageModifiedBy')?.valueChanges
    .subscribe(selectedValue => {

      // if(this.requestForm.controls.request.get('isModifyBy')?.value != 1){
        // console.log(selectedValue);
        this.requestForm.controls.request.get('isModify')?.setValue(1); 
        // this.requestForm.controls.request.get('stageModifiedBy')?.setValue(selectedValue);
      // }
      // this.setEnquiryStatusPermissions();
      // this.setReplyTypeValue();
      // this.saveCompletedBy(selectedValue);
    });
  }

  bindDropdowns() {
    console.log(this.lookups);
    this.zones = this.lookups[this.service.constants.MasterCategories.ZoneMaster];
    this.serviceGroups = this.lookups[this.service.constants.MasterCategories.ServiceGroup];
    this.serviceNames = this.lookups[this.service.constants.MasterCategories.ServiceMaster];
    const serviceStages = this.lookups[this.service.constants.MasterCategories.ServiceStageMaster];
    this.clients = this.lookups[this.service.constants.MasterCategories.ServiceForMaster];
    this.preferredTimes = this.lookups[this.service.constants.LookupCategories.PreferredTime];
    this.priorities = this.lookups[this.service.constants.LookupCategories.ServicePriority];
  this.completedBy = [];
 console.log("this is a obj",this.obj);
 console.log(
  this.requestForm.controls.request.get('currentZoneValue')?.value);
     const reqData ={
       userTypeId: 2,
       zoneId:  parseInt(this.obj.zoneId)
     };
     console.log("this is a req",reqData);
     
     this.service.GetEmployeeListByZoneIdAndTypeId(reqData).subscribe((response: any) => {
      console.log(response.data[0].displayText); 
      this.employeeList = response.data;
      this.employeeNames = [];
      response.data.forEach((element:any,index:any)=>{
        this.employeeNames.push({displayText : element.displayText,keyName: parseInt(element.keyName)})
    });

    if(this.obj.request.enquiryStatus =="21" || this.obj.request.enquiryStatus == 21){
      let manPowerId = this.obj.request.stageModifiedBy;
      var isname = false ;
      this.obj.assignedManpowerList.forEach((element:any) => {
        console.log("this is a manPower",manPowerId);        
        console.log(element.employeeId);
        
        
        if(element.employeeId == manPowerId){
          this.completedByname = element.employeeName     
          isname = true ;     
        }
      });

       if(this.ShowCompetedBy == false){
        var obj = this.employeeNames.find((x:any)=>x.keyName == manPowerId);
        this.completedByname = obj?.displayText;
        isname = obj == null ? false : true ;
       }
       if(!isname){
        this.completedByname = this.obj.request.stageModifyname;
      }
      console.log(this.completedByname);
       this.ShowCompetedBy = true;
    }
    
    
  });
    this.serviceStatuses = this.service.getStatusDropdownValues(this.RequestDetail.get('currentEnquiryStatus')?.value, serviceStages, this.requestForm.controls.request.get('serviceId')?.value);
   if( this.serviceStatuses.findIndex(x =>x.keyName =='27')){
    this.serviceStatuses.splice(this.serviceStatuses.findIndex(x =>x.keyName =='27'), 1);
   }
    if (this.RequestDetail.get('currentEnquiryStatus')?.value == 5 || this.RequestDetail.get('currentEnquiryStatus')?.value == 6) {
      this.preferredDateDisabled = false;
    }
  }
   
   
  public get RequestDetail() {
    return this.requestForm.controls.request as FormGroup;
  }

  setReplyTypeValue() {
    this.replytype = this.requestForm.controls.request.get('enquiryStatus')?.value == 3 || this.requestForm.controls.request.get('enquiryStatus')?.value == 4 ? true : false;
    console.log(this.requestForm.controls.request.get('enquiryStatus')?.value);
    console.log(this.requestForm.controls.request.get('enquiryStatus')?.value);
  }

  disableFields() {
    if (this.RequestDetail.get('currentEnquiryStatus')?.value === this.service.constants.ServiceStages.Closed) {
      this.requestForm.disable();
    } else {
      this.RequestDetail.get('mobileNo')?.disable();
      this.RequestDetail.get('serviceGroupId')?.disable();
      this.RequestDetail.get('serviceId')?.disable();
      this.RequestDetail.get('enquiryDate')?.disable();
      this.RequestDetail.get('serviceFor')?.disable();
    }
  }


  setEnquiryStatusPermissions() {
    const currentStatus = this.RequestDetail.get('enquiryStatus')?.value;
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');

    switch (currentStatus) {
      case this.service.constants.ServiceStages.WaitingForApproval:
      case this.service.constants.ServiceStages.InQueue:
        this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
        this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
        this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);

        // this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(false);
        // this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
        // this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(false);

        this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(true);
        this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(true);
        this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(true);

        this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
        this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
        this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);

        this.requestForm.controls.assignedManpowerPermission.get('create')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('edit')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('delete')?.setValue(false);

        this.requestForm.controls.manpowerTaskTimePermission.get('create')?.setValue(false);
        this.requestForm.controls.manpowerTaskTimePermission.get('edit')?.setValue(false);
        this.requestForm.controls.manpowerTaskTimePermission.get('delete')?.setValue(false);
        break;
      // Assigned
      case this.service.constants.ServiceStages.Assigned:
        if(json.roleID == 9 || json.roleID == 3 || json.roleID == 2 || json.roleID == 4){     
          this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(true);
          this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(true);
          this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(true);
  
          this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
          if (this.requestForm.get('manpowerTaskTimeList')?.value.length > 0) {
            this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(true);
          } else {
            this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(true);
          }
        }else{
          this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
        }


        this.requestForm.controls.assignedManpowerPermission.get('create')?.setValue(true);
        this.requestForm.controls.assignedManpowerPermission.get('edit')?.setValue(true);
        this.requestForm.controls.assignedManpowerPermission.get('delete')?.setValue(true);

        this.requestForm.controls.manpowerTaskTimePermission.get('create')?.setValue(true);
        this.requestForm.controls.manpowerTaskTimePermission.get('edit')?.setValue(true);
        this.requestForm.controls.manpowerTaskTimePermission.get('delete')?.setValue(true);


        break;
      // In Progress
      case this.service.constants.ServiceStages.InProgress:
        if(json.roleID == 9 || json.roleID == 3 || json.roleID == 2 || json.roleID == 4){  
          this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(true);
         // this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
         this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(true);
          this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(true);
  
          this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);

         }else{
          this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
        }



        this.requestForm.controls.assignedManpowerPermission.get('create')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('edit')?.setValue(true);
        this.requestForm.controls.assignedManpowerPermission.get('delete')?.setValue(true);

        this.requestForm.controls.manpowerTaskTimePermission.get('create')?.setValue(true);
        this.requestForm.controls.manpowerTaskTimePermission.get('edit')?.setValue(true);
        this.requestForm.controls.manpowerTaskTimePermission.get('delete')?.setValue(true);
        break;
      // delay
      case this.service.constants.ServiceStages.Delay:
        if(json.roleID == 9 || json.roleID == 3 || json.roleID == 2 || json.roleID == 4){ 
        this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
        this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
        this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);

        this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(true);
        this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(true);
        this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(true);

        this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
        this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
        this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
        }else{
          this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
        }
        this.requestForm.controls.assignedManpowerPermission.get('create')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('edit')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('delete')?.setValue(true);

        this.requestForm.controls.manpowerTaskTimePermission.get('create')?.setValue(false);
        this.requestForm.controls.manpowerTaskTimePermission.get('edit')?.setValue(false);
        this.requestForm.controls.manpowerTaskTimePermission.get('delete')?.setValue(false);
        break;
      case this.service.constants.ServiceStages.Completed:
        if(json.roleID == 9 || json.roleID == 3 || json.roleID == 2 || json.roleID == 4){ 
        this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
        this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
        this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);

        // this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(false);
        // this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
        // this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(false);

        this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(true);
        this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(true);
        this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(true);
        
        this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
        this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
        this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
        }else{
          this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
        }
        this.requestForm.controls.assignedManpowerPermission.get('create')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('edit')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('delete')?.setValue(false);

        this.requestForm.controls.manpowerTaskTimePermission.get('create')?.setValue(true);
        this.requestForm.controls.manpowerTaskTimePermission.get('edit')?.setValue(true);
        this.requestForm.controls.manpowerTaskTimePermission.get('delete')?.setValue(true);
        break;
      case this.service.constants.ServiceStages.Closed:
        if(json.roleID == 9 || json.roleID == 3 || json.roleID == 2 || json.roleID == 4){ 
        this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
        this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
        this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);

        this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(false);
        this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
        this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(false);

        this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
        this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
        this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
        }else{
          this.requestForm.controls.openingTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.openingTaskTypePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.spareAndConsumablePermission.get('create')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('edit')?.setValue(false);
          this.requestForm.controls.spareAndConsumablePermission.get('delete')?.setValue(false);
  
          this.requestForm.controls.actualTaskTypePermission.get('create')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('edit')?.setValue(false);
          this.requestForm.controls.actualTaskTypePermission.get('delete')?.setValue(false);
        }
        this.requestForm.controls.assignedManpowerPermission.get('create')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('edit')?.setValue(false);
        this.requestForm.controls.assignedManpowerPermission.get('delete')?.setValue(false);

        this.requestForm.controls.manpowerTaskTimePermission.get('create')?.setValue(false);
        this.requestForm.controls.manpowerTaskTimePermission.get('edit')?.setValue(false);
        this.requestForm.controls.manpowerTaskTimePermission.get('delete')?.setValue(false);
        break;
    }
  }
  saveCompletedBy(selectedValue : any){
    // this.requestForm.controls.isModifyBy.setValue(1);

    
    
  }
}
