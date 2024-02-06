import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
  getUserReport(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Common.getUserReport(), reqData);
  }
  addUser(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.addUser(), reqData);
  }
  getUserDetailById(UserId:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.getUserDetailById(), UserId);
  }
}
