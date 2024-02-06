import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(injector: Injector, readonly auth: AuthService) {
    super(injector);
  }

  authenticate(loginModel: any) {
    return this.auth.authenticate(loginModel);
  }

  forgotPasword(email: any) {
    return this.auth.forgotPasword(email);
  }
}
