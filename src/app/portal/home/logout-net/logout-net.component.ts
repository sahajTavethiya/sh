import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from 'src/app/library/shared/services/auth.service';

@Component({
  selector: 'app-logout-net',
  templateUrl: './logout-net.component.html',
  styleUrls: ['./logout-net.component.scss']
})
export class LoginNetComponent implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  isType = 1;

  constructor(
    readonly router: Router,readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    
  }

  
}
