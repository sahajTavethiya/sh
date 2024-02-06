import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { ManpowerService } from './manpower.service';
import { MatDialog } from '@angular/material/dialog';
import { ManpowerTaskTimeComponent } from './manpower-task-time/manpower-task-time.component';
import { ManpowerTaskTimeList } from 'src/app/library/core/models/service-request/manpower-taskTimeList-model';
import { AssignedManpowerComponent } from './assigned-manpower/assigned-manpower.component';
import { RequestService } from '../request.service';
import { AssignedManpowerList } from 'src/app/library/core/models/service-request/assigned-manpowerList-model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/library/shared/services/auth.service';


@Component({
  selector: 'app-manpower',
  templateUrl: './manpower.component.html',
  styleUrls: ['./manpower.component.scss']
})
export class ManpowerComponent implements OnInit {
  
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  getSRAvailableManpower: Array<any>;
  showaddbutt: any;
  isDisabled =true;


  constructor(readonly service: ManpowerService,readonly formBuilder: RxFormBuilder,
    readonly dialog: MatDialog,readonly service1: RequestService,readonly authService: AuthService,) { }

  ngOnInit(): void {
    console.log(this.requestForm.controls.assignedManpowerList?.value);
    
    if(this.requestForm.controls.request.get('enquiryStatus')?.value == 2 || this.requestForm.controls.request.get('enquiryStatus')?.value == 25){
      this.showaddbutt = true;
    }
    if(this.requestForm.controls.request.get('enquiryStatus')?.value == 2){
      this.isDisabled = false;
    }

    
  }

  OpenAssignedManpoweredit(ob: MatCheckboxChange,index: any){
    const assignedManpowerList = this.requestForm.controls.assignedManpowerList as FormArray;
      const row = assignedManpowerList.at(index);
      row.get('isActive')?.setValue(ob.checked);
      console.log(this.requestForm.controls.assignedManpowerList.value);
  }

  

  deleteAssignedManpower(taskTypeId: any,index: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { 
              header: "Delete",
              message: "Are you sure to delete!" 
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const assignedManpowerLists = this.requestForm.controls.assignedManpowerList as FormArray;
        const row = assignedManpowerLists.at(index);
        if (row.get('id')?.value > 0) {
          row.get('isDeleted')?.setValue(true);
          row.get('rowStatus')?.setValue(4);
        } else {
          assignedManpowerLists.removeAt(index);
        }
      }
    });
  }

  addOpenAssignedManpower() {
    
    const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
    const data ={
        "serviceId": this.requestForm.controls.request.get('serviceId')?.value,
        "cityId": this.requestForm.controls.request.get('cityId')?.value,
        "prerredDate": this.requestForm.controls.request.get('preferredDate')?.value,
      //  "companyId": this.authService.currentUserValue.companyMasterId
      }
      
    
    this.service1.getSRAvailableManpower(data).subscribe((response: any) => {
      if (response.status == 'success') {
        console.log('response.data');
        console.log(response.data);
        if(response.data.length){
          console.log('this.getSRAvailableManpower ');
          this.getSRAvailableManpower = response.data;
        }else{
          this.getSRAvailableManpower = [];
        }

        if (serviceId) {
          const getSRAvailableManpower = this.getSRAvailableManpower
          console.log('getSRAvailableManpower');
          console.log(getSRAvailableManpower);
           const dialogRef = this.dialog.open(AssignedManpowerComponent, {
             data: { serviceId: parseInt(serviceId),getSRAvailableManpower },
             width: '6000px'
           });
           dialogRef.afterClosed().subscribe(result => {
             if (result) {
               console.log('sdfuwgufgssfjsdfghjsdgfusghdhfg');
               console.log(result);
               this.addAssignedManpower(result);
             }
           });
         } else {
           this.service.notify.showError('Please select Service in Service Request Details');
         }
        
      }
    });
    
  }

  

  addAssignedManpower(taskTime: Array<any>) {
    const assignedManpowerList = this.requestForm.controls.assignedManpowerList as FormArray;

    console.log('taskTime1');
    console.log(taskTime);
    if (taskTime) {

      taskTime.forEach(element => {
        console.log(element);
        let x = new AssignedManpowerList();
        x.employeeName= element.employeeName;
        x.employeeId= element.employeeId;
        x.activeLocation= element.activeLocation;
        x.createdBy= this.authService.currentUserValue.id.toString();
        x.isActive = true;
        x.companyName= element.companyName;
        x.serviceName= element.serviceName;
        x.mobileNo= element.mobile;
        x.rowStatus= 1;
        x.id= 0;
         const taskTimeForm = this.formBuilder.formGroup(x);
      assignedManpowerList.push(taskTimeForm);
        
      });
      
    }
  }

  addOpenManpowerTaskTimeDetails() {
    
    const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
    const assignedManpowerList = this.requestForm.controls.assignedManpowerList?.value;
    if (serviceId) {
     
      const dialogRef = this.dialog.open(ManpowerTaskTimeComponent, {
        data: { serviceId: parseInt(serviceId),assignedManpowerList },
        width: '600px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('result');
          console.log(result);
          this.addManpowerTaskTime(result);
        }
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
    }
  }

  addManpowerTaskTime(taskTime: ManpowerTaskTimeList) {
    const manpowerTaskTimeLists = this.requestForm.controls.manpowerTaskTimeList as FormArray;

    console.log('taskTime11');
    console.log(taskTime);
    if (taskTime) {
      const newTaskTime = new ManpowerTaskTimeList(taskTime);
      newTaskTime.id = 0;
      newTaskTime.rowStatus= 1;
      newTaskTime.createdBy= this.authService.currentUserValue.id.toString();
      
      newTaskTime.startTime= this.service.Moment(taskTime.startTime).format("yyyy-MM-DDTHH:mm:ss");
      console.log("------------",newTaskTime)
      const taskTimeForm = this.formBuilder.formGroup(newTaskTime);
      manpowerTaskTimeLists.push(taskTimeForm);
    }
  }
  
  ManpowerTaskTimeEdit(ob: any,index: any,type: any ){

    const manpowerTaskTimeLists = this.requestForm.controls.manpowerTaskTimeList as FormArray;
    const row = manpowerTaskTimeLists.at(index);
    console.log(ob);
    console.log(row);
    console.log(type);
    let pattern = "yyyy-MM-DDTHH:mm:ss";
    if(type == 1){
      row.get('startTime')?.setValue(this.service.Moment(ob).format(pattern));
    }else{
      row.get('endTime')?.setValue(this.service.Moment(ob).format(pattern));
    }
      

  }

  public get RequestDetail() {
    return this.requestForm.controls.request as FormGroup;
  }

}

