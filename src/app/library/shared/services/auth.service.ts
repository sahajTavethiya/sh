import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiProxy } from '../../core/constants/api-proxy';
import { User } from '../../core/models/user/user.model';
import { ApiWrapperService } from './api/api-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(readonly api: ApiWrapperService, readonly apiProxy: ApiProxy) {
    if (localStorage.getItem('currentUser') === 'undefined') {
      localStorage.removeItem('currentUser');
    }
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject = new BehaviorSubject<User>(json);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  authenticate(loginModel: any) {
    return this.api.post(this.apiProxy.User.authenticate(), loginModel)
      .pipe(map((response: any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const userDetail = response?.data?.userDetails;
        localStorage.setItem('currentUser', JSON.stringify(userDetail));
        this.currentUserSubject.next(userDetail);
        return response;
      }));
  }

  forgotPasword(email: any) {
    return this.api.get(this.apiProxy.User.forgotPasword(email))
      .pipe(map((response: any) => {
        return response;
      }));
  }

  isAuthenticated() {
    if (this.currentUserValue && this.currentUserValue.id) {
      return true;
    }
    return false;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }
}
