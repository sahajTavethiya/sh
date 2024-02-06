
import { Injectable, Injector } from '@angular/core';
import { ApiProxy } from 'src/app/library/core/constants/api-proxy';
import { ApiWrapperService } from 'src/app/library/shared/services/api/api-wrapper.service';
import { BaseService } from 'src/app/library/shared/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class ContractorReconciliationServiceService  extends BaseService{

  constructor(injector: Injector, readonly api: ApiWrapperService,readonly apiProxy: ApiProxy) { 
    super(injector);
  }
  getReconciliationReport(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.getReconciliationReport(), reqData);
  }
  GetEmployeeListByZoneIdAndTypeId(data:any){
    return this.api.post(this.apiProxy.ServiceRequest.GetEmployeeListByZoneIdAndTypeId(),data);
  }
  getAllEmployees(){
    return this.api.get(this.apiProxy.ServiceRequest.GetAllEmployees())
  }
}
