import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  isType = 1;
  oldUrl: string = environment.oldUrl;

  constructor(readonly service: LoginService,
    readonly router: Router,readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder) { }

  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if(json?.id){
       this.router.navigate(['/']);
      //let url = this.oldUrl+"/Account/LoginApp?page=DASHBOARD&token="+this.authService.currentUserValue.token;

      //window.open(url,"_self");
    }
    this.initialize();
  }

  initialize() {
    this.loginForm = this.formBuilder.group({
      email: [localStorage.getItem("email"), [RxwebValidators.required]],
      password: ['', [RxwebValidators.required]],
      rememberMe: ['']
    });
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [RxwebValidators.email()]]
    });
  }

  ForgotPassword(type:any){
    this.isType = type;
    console.log(type);
  }
  forgotPasswordSubmit(){
    if (this.forgotPasswordForm.valid) {
      
      this.service.forgotPasword(this.forgotPasswordForm.getRawValue().username).
        pipe(first())
        .subscribe(
          data => {
            if(data.status == "success"){
              this.isType = 1;
              this.service.notify.showSuccess(data.data);
            }else if(data.status == "failure"){
              this.service.notify.showError(data.error);
            }
            else{
              this.service.notify.showError('something went wrong');
            }
            console.log(data);
          },
          error => {
            this.service.notify.showError('Wrong e-mail , Please try again');
          });
    } else {
      this.service.notify.showError('Please enter required details');
      this.loginForm.markAllAsTouched();
    }
  }

  login() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.rememberMe) {
        localStorage.setItem('email', this.loginForm.value.email);
        localStorage.setItem('rememberMe', this.loginForm.value.rememberMe);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('rememberMe');
      }
      this.service.authenticate(this.loginForm.getRawValue()).
        pipe(first())
        .subscribe(
          data => {
           //let url = this.oldUrl+"/Account/LoginApp?page=DASHBOARD&token="+this.authService.currentUserValue.token;

            //window.open(url,"_self");
             this.router.navigate(['/']);
          //  window.location.reload();
          console.log("loginData",data)
          },
          error => {
            this.service.notify.showError('Wrong e-mail and/or password, Please try again');
          });
    } else {
      this.service.notify.showError('Please enter required details');
      this.loginForm.markAllAsTouched();
    }
  }

}
