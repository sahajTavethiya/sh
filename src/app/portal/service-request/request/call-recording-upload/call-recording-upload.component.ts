import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { CallRecordingUpload } from 'src/app/library/core/models/service-request/call-recording-upload.model';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { RequestService } from '../request.service';




@Component({
  selector: 'app-call-recording-upload-signature',
  templateUrl: './call-recording-upload.component.html',
  styleUrls: ['./call-recording-upload.component.scss']
})
export class CallRecordingUploadComponent implements OnInit {
  callRecordingUploadForm: FormGroup;
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  fileToUpload: any;
  fileName: any;
  fileToUploadarr: any;
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: RequestService,
    readonly authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: number ,requestId:number },
    public dialogRef: MatDialogRef<CallRecordingUploadComponent>) { }

  ngOnInit(): void {
    const callRecordingUpload = new CallRecordingUpload();
    this.callRecordingUploadForm = this.formBuilder.formGroup(callRecordingUpload);
    
    this.callRecordingUploadForm.get('enquiryID')?.disable();
    this.callRecordingUploadForm.patchValue({enquiryID: this.data.requestId})
  }


  handleFileInput(event: any) {
    console.log(event.target.files[0]);
    if(event.target.files[0]){
      this.fileName = event.target.files[0].name;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileToUpload = reader.result;
          this.fileToUploadarr = this.fileToUpload.split(',')
      };
      
    }else{
      this.fileToUploadarr = [];
      this.fileToUpload = '';
      this.fileName = '';
    }
    
}




adCcallRecordingUpload() {
  const container = this.callRecordingUploadForm.getRawValue();
  container.recordingFile = this.fileToUploadarr[1];
  container.recordingFileName = this.fileName;
  container.createdBy =this.authService.currentUserValue.id.toString();
  container.isdownloaded = false;
  container.callTime= this.service.Moment(container.callTime).format("yyyy-MM-DDTHH:mm:ss");
  console.log(container);
  // return false;
  
    if (this.callRecordingUploadForm.valid) {

        

        this.service.callRecordingUpload(container).subscribe((response: any) => {
          if (response.status == 'success') {
            this.service.notify.showSuccess('Call Recording Upload successfully');
            this.dialogRef.close();
          } else {
            response.errors.forEach((keys: any, vals: any) => {
              console.log(keys.errorMessage);
              this.service.notify.showSuccess(keys.errorMessage);
            });
          }
        });
    } else {
      this.callRecordingUploadForm.markAllAsTouched();
      this.service.notify.showDefaultError();
    }

    
  }

  cancel() {
    this.dialogRef.close();
  }
}
