import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { RequestService } from '../request.service';




@Component({
  selector: 'app-upload-customer-signature',
  templateUrl: './upload-customer-signature.component.html',
  styleUrls: ['./upload-customer-signature.component.scss']
})
export class UploadCustomerSignatureComponent implements OnInit {
  UploadCustomerSignatureForm: FormGroup;
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  fileToUpload: any;
  fileToUploadarr: any;
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: RequestService,
    readonly authService: AuthService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: number ,customerCorrespondenceList:any,requestId:number },
    public dialogRef: MatDialogRef<UploadCustomerSignatureComponent>) { }

  ngOnInit(): void {

    this.UploadCustomerSignatureForm = this.fb.group({
      signature: [""]
    });
  }


  handleFileInput(event: any) {
    console.log(event.target);
    if(event.target.files[0]){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
        this.fileToUpload = reader.result;
          this.fileToUploadarr = this.fileToUpload.split(',')
      };
    }else{
      this.fileToUpload = '';
      this.fileToUploadarr = [];
    }
}




  addTaskType() {
    
   

    if(this.fileToUpload){
      let data = {
        'enquiryId' :this.data.requestId,
        'uploadedBy' :this.authService.currentUserValue.id,
        'signature' :this.fileToUploadarr[1]
  
      }
      console.log(data);
      
      this.service.uploadCustomerSignature(data).subscribe((response: any) => {
        if (response.status == 'success') {
          this.service.notify.showSuccess('Customer Signature Upload successfully');
          this.dialogRef.close();
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
