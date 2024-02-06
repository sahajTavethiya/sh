import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { RequestDetailService } from 'src/app/portal/service-request/request/request-detail/request-detail.service';
import { RequestService } from 'src/app/portal/service-request/request/request.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  ChangePasswordForm: FormGroup;
  apiUrl: string = environment.apiUrl;
  
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service1: RequestService,
    readonly service: RequestDetailService,
    public fb: FormBuilder,
    readonly router: Router,readonly authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { enquiryData: any },
    public dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
    this.ChangePasswordForm = this.fb.group({
      OldPassword: [''],
      NewPassword: [''],
      ConfirmPassword: [''],
    });
    

  }
 

  changePasswordSubmit(){
    const updateSR = this.ChangePasswordForm.getRawValue();
    console.log(updateSR);
    
    if(updateSR.NewPassword == updateSR.ConfirmPassword){
      this.service1.ChangePassword(updateSR.OldPassword,updateSR.NewPassword).subscribe((response: any) => {
        console.log(response);
        if (response.status == 'success') {
          this.service.notify.showSuccess('Change Password successfully');
          this.dialogRef.close();
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          console.log(response.errors);
            this.service.notify.showSuccess(response.error);
          
        }
      });
    }else{
      this.service.notify.showSuccess('Confirm Password does not match with New Password.');
    }
    
  }

 

  cancel() {
    this.dialogRef.close();
  }
}
