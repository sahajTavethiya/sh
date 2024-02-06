import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
  getClietReport(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Common.getClietReport(), reqData);
  }
  saveClient(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.saveClient(), reqData);
  }
}
