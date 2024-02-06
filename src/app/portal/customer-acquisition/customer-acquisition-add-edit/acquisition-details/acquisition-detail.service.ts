import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionDetailService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  GetEmployeeListByZoneIdAndTypeId = (data: any) => this.api.post(this.apiProxy.ServiceRequest.GetEmployeeListByZoneIdAndTypeId(), data);
  CustomerDocuments = (requestId: number,name :any) => this.api.get1(this.apiProxy.ServiceRequest.CustomerDocuments(requestId,name));


}
