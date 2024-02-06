import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AuthService } from 'src/app/library/shared/services/auth.service';
// import { RequestService } from 'src/app/portal/service-request/request/request.service';
import { CustomerAcquisitionAddEditService } from '../customer-acquisition-add-edit.service';




@Component({
  selector: 'app-reject-details',
  templateUrl: './reject-details.component.html',
  styleUrls: ['./reject-details.component.scss']
})
export class RejectDetailsComponent implements OnInit {
  rejectDetailsForm: FormGroup;
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  fileToUpload: any;
  fileToUploadarr: any;
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: CustomerAcquisitionAddEditService,
    readonly authService: AuthService,
    public fb: FormBuilder,
    private routeUrl: Router,
    
    @Inject(MAT_DIALOG_DATA) public data: { requestId: number},
    public dialogRef: MatDialogRef<RejectDetailsComponent>) { }

  ngOnInit(): void {

    this.rejectDetailsForm = this.fb.group({
      reject: [""]
    });
  }


  addRejectDetails() {
    
   

    if(this.rejectDetailsForm.valid){
      const container = this.rejectDetailsForm.getRawValue();
      let data = {
        'id' :this.data.requestId,
        'entryBy' :this.authService.currentUserValue.id,
        'rejectReason' :container.reject
  
      }
      console.log(data);
      console.log(this.data);
      
      this.service.customerMasterReject(data).subscribe((response: any) => {
        if (response.status == 'success') {
          this.service.notify.showSuccess('Customer Acquisition REJECTED successfully');
          this.dialogRef.close();
          this.routeUrl.navigate(['/customer-acquisition']);
        } else {
          response.errors.forEach((keys: any, vals: any) => {
            console.log(keys.errorMessage);
            this.service.notify.showSuccess(keys.errorMessage);
          });
        }
      });
    }else{
      this.service.notify.showDefaultError();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
