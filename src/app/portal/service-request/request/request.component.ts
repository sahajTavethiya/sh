import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { RequestContainer } from 'src/app/library/core/models/service-request/request-container.model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { CallRecordingUploadComponent } from './call-recording-upload/call-recording-upload.component';
import { RequestService } from './request.service';
import { UploadCustomerSignatureComponent } from './upload-customer-signature/upload-customer-signature.component';
import { ViewCustomerDetailsComponent } from './view-customer-details/view-customer-details.component';
import { ViewImageComponent } from './view-image/view-image.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  addForm : FormGroup;
  requestId: number;
  requestDetailLookups: any;
  apiUrl: string = environment.apiUrl;
  blob :any;
  oldUrl: string = environment.oldUrl;
  obj : any;
  currentZone1 : any;
  displayModal: boolean = false;
  addFormGranted : boolean = false;
  showPlus : boolean = false;
  currentSRNumber : number ;
  constructor(
    readonly service: RequestService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,readonly authService: AuthService,
    private routeUrl: Router) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params.id;
    this.bindDropdowns();
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.ZoneMaster,
      this.service.constants.MasterCategories.ServiceMaster,
      this.service.constants.MasterCategories.ServiceStageMaster,
      this.service.constants.MasterCategories.ServiceForMaster,
      this.service.constants.MasterCategories.ServiceGroup,
      this.service.constants.LookupCategories.PreferredTime,
      this.service.constants.LookupCategories.ServicePriority,
    ];
    this.service.getLookups(categories, (lookups) => {
      this.requestDetailLookups = lookups;
      this.initialize();
    });
  }

  initialize() {
    if (this.requestId) {
      this.service.getRequest(this.requestId).subscribe((response: any) => {
        if (response.status === 'success' && response.data) {
          this.obj = {
            assignedManpowerList  : response.data.assignedManpowerList,
            request :response.data.request,
          }
          if(response.data.request.enquiryStatus == "21")
          {
            response.data.request.isModifyBy = 0;
          }
          
          const requestContainer = new RequestContainer(response.data);
          this.requestForm = this.formBuilder.formGroup(requestContainer);
          this.getCurrentStatusValue();

          this.addForm = new FormGroup({
            file: new FormControl(null, Validators.required),
          });
        }

      });
    } else {
      const requestContainer = new RequestContainer();
      this.requestForm = this.formBuilder.formGroup(requestContainer);
    }
  }

  getCurrentStatusValue() {
    const currentStatus = this.requestDetailLookups[this.service.constants.MasterCategories.ServiceStageMaster].filter((lookup: any) => {
      return lookup.keyName === this.requestForm.controls.request.get('currentEnquiryStatus')?.value;
    });

    if (currentStatus && currentStatus.length > 0) {
      this.requestForm.controls.request.get('currentEnquiryStatusValue')?.setValue(currentStatus[0].displayText);
    }
    const currentZone = this.requestDetailLookups[this.service.constants.MasterCategories.ZoneMaster].filter((lookup: any) => {
      return lookup.keyName === this.requestForm.controls.request.get('cityId')?.value;
    });
    
    if (currentZone && currentZone.length > 0) {
    this.requestForm.controls.request.get('currentZoneValue')?.setValue(currentZone[0].displayText);
    this.currentZone1 = currentZone[0].keyName;
    this.obj.zoneId = this.currentZone1
    }
    const currentClient = this.requestDetailLookups[this.service.constants.MasterCategories.ServiceForMaster].filter((lookup: any) => {
      return lookup.keyName === this.requestForm.controls.request.get('serviceFor')?.value;
    });
    
    if (currentClient && currentClient.length > 0) {
      this.requestForm.controls.request.get('currentClientValue')?.setValue(currentClient[0].displayText);
    }
    
  }

  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();

      console.log(this.requestForm.controls.request.get('stageModifiedBy')?.value);
      if (this.requestForm.controls.request.get('enquiryStatus')?.value == 25) {
        this.requestForm.controls.request.get('isInProgress')?.setValue(true);
      }
      if(container.request.preferredDate == ''){
        container.request.preferredDate = null
      }
      if(container.request.gaugeCalibrationValidityFromDate == ''){
        container.request.gaugeCalibrationValidityFromDate = null
      }
      if(container.request.gaugeCalibrationValidityFromTo == ''){
        container.request.gaugeCalibrationValidityFromTos = null
      }
      if(container.request.isModify == 1){
       let reqData = {
        StageModifiedBy : (this.requestForm.controls.request.get('stageModifiedBy')?.value).toString(),
        SRNumber : this.requestForm.controls.request.get('id')?.value
       }
        this.service.updateStageModifiedBy(reqData).subscribe((response: any) => {
             console.log(response);
             this.service.notify.showSuccess(response.data[0].msg);
        })        
      }
      else{
        container.request.stageModifiedBy = this.service.currentUser?.id.toString();         
      console.log(this.service.currentUser?.id);
      console.log(container)
      this.service.saveRequest(container).subscribe((response: any) => {
        if (response.status == 'success') {
          this.service.notify.showSuccess('Service Request saved successfully');
          // this.ngOnInit();
          this.routeUrl.navigate(['/service-requests']);
        } else {
          console.log(response.errors);
          response.errors.forEach((keys: any, vals: any) => {
            console.log(keys.errorMessage);
            this.service.notify.showSuccess(keys.errorMessage);
          });
        }
      });
    }
    } else {
      this.requestForm.markAllAsTouched();
      this.service.notify.showError('Please enter all required fields');
    }
  }
  addNewSR(){
    this.addFormGranted = true;
    this.displayModal = true;
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to cancel your changes?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }


  generatePDF() {


    this.service.JMR(this.requestId).subscribe((data:any) => {
      
      console.log(data);
      this.blob = new Blob([data], {type: 'application/pdf'});
    
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      if(this.requestForm.controls.request.get('serviceId')?.value==1){
        link.download ="JMR_"+this.requestForm.controls.request.get('customerId')?.value;
      }
      else
      {
        link.download ="RFC_"+this.requestForm.controls.request.get('customerId')?.value;
      }
      link.click();
    
    });
  }
  saveNotes(){
    let saveData = this.addForm.value;
    let reqObj = {
      SRNumber : this.requestForm.controls.request.get('id')?.value,
      ImageData : saveData.file,
    }
    this.service.UploadImageOfIsometricGraph(reqObj).subscribe((response:any)=>{
      console.log(response);
    })
    this.displayModal = false;
    
  }
  imgName:any;
  onFileSelected(event:any){
    const files: FileList = event.target.files; 
    this.imgName = event.target.files[0].name; 
    if (files.length > 0) {
      const file = files[0];
      const reader :any = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.toString().split(',')[1];
        this.addForm.patchValue({ file: base64String});
        this.addForm.patchValue({ ImageName:  this.imgName});
      };
      reader.readAsDataURL(file);
    }
    
  }
  changeStatus(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        header: "Service Request Change Status Confirmation",
        message: "Are you sure you want to change status of this Service Request to Waiting For Approval?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const container = {
          "id": this.requestId,
          "EnquiryStatus": 5
        }
        this.service.changeStatus(container).subscribe((response: any) => {
          if (response.status == 'success') {
            this.service.notify.showSuccess("Service Request's status changed.");
            // this.ngOnInit();
            this.routeUrl.navigate(['']);
          } else {
            console.log(response.errors);
            response.errors.forEach((keys: any, vals: any) => {
              console.log(keys.errorMessage);
              this.service.notify.showSuccess(keys.errorMessage);

            });
          }
        });
      }
    });
  }
  requestsLists() {
    this.routeUrl.navigate(['/service-requests']);
  }

  callRecordingUpload() {
    const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
    const requestId = this.requestId;
    if (serviceId) {
      const dialogRef = this.dialog.open(CallRecordingUploadComponent, {
        data: { serviceId: parseInt(serviceId), requestId },
        width: '800px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.addTaskType(result);
        }
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
  }

  uploadCustomerSignature() {
    const customerCorrespondenceList = this.requestForm.controls.customerCorrespondenceList?.value;
    const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
    const requestId = this.requestId;
    if (serviceId) {
      const dialogRef = this.dialog.open(UploadCustomerSignatureComponent, {
        data: { serviceId: parseInt(serviceId), customerCorrespondenceList, requestId },
        width: '800px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.addTaskType(result);
        }
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
  }


  viewImage() {
    const documentList = this.requestForm.controls.documentList?.value;
    const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
    const requestId = this.requestId;
    console.log(this.requestForm.controls.request.get('id')?.value);
    
    if (serviceId) {
      const dialogRef = this.dialog.open(ViewImageComponent, {
        data: { serviceId: parseInt(serviceId), documentList, requestId, SRNumber:this.requestForm.controls.request.get('id')?.value},
        width: '800px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.addTaskType(result);
        }
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
  }
  viewCustomerDetails() {
    const serviceId = this.requestForm.controls.request.get('serviceId')?.value;
    const customerId = this.requestForm.controls.request.get('customerId')?.value;
    const requestId = this.requestId;
    if (serviceId) {
      const dialogRef = this.dialog.open(ViewCustomerDetailsComponent, {
        data: { serviceId: parseInt(serviceId), requestId, customerId },
        width: '800px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.addTaskType(result);
        }
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
  }

  cancelRequest(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        header: "Cancel Service Request Confirmation",
        message: "Are you sure you want to cancel this Service Request?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.service.CancelRequest(this.requestId).subscribe((response: any) => {
          if (response.status == 'success') {
            this.service.notify.showSuccess("Service Request Cancelled.");
            // this.ngOnInit();
            this.routeUrl.navigate(['']);
          } else {
            console.log(response.error);
            this.service.notify.showSuccess(response.error);
            // response.errors.forEach((keys: any, vals: any) => {
            //   console.log(keys.errorMessage);
            //   this.service.notify.showSuccess(keys.errorMessage);

            // });
          }
        });
      }
    });
  }

}
