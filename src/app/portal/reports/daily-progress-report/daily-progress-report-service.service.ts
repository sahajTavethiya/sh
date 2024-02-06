
import { Injectable, Injector } from '@angular/core';
import { ApiProxy } from 'src/app/library/core/constants/api-proxy';
import { ApiWrapperService } from 'src/app/library/shared/services/api/api-wrapper.service';
import { BaseService } from 'src/app/library/shared/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class DailyProgressReportServiceService extends BaseService{


  constructor(injector: Injector, readonly api: ApiWrapperService,readonly apiProxy: ApiProxy) { 
    super(injector);
  }
  getDPR_Report(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.getDPR_Report(), reqData);
  }
  GetEmployeeListByZoneIdAndTypeId(data:any){
    return this.api.post(this.apiProxy.ServiceRequest.GetEmployeeListByZoneIdAndTypeId(),data);
  }
  getAllEmployees(){
    return this.api.get(this.apiProxy.ServiceRequest.GetAllEmployees())
  }
  getAllApplicationUser(){
    return this.api.get(this.apiProxy.ServiceRequest.getAllApplicationUser())
  }
  getSubServices(){
    return this.api.get(this.apiProxy.ServiceRequest.getSubServices())
  }
  spGetAllZonesByAppUserId(id:number){
    return this.api.get(this.apiProxy.ServiceRequest.GetAllZonesByAppUserId(id))
  }
}
