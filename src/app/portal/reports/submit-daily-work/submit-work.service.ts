import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SubmitWorkService  extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
  getOrderReport(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderReport(), reqData);
  }
  saveOrder(ReqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Common.saveOrder(),ReqData)
  }
  getOrderDetailById(ReqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderDetailById(),ReqData)
  }
  getOrderListForAdminToAssignManager(ReqData : any){
    return this.api.get<Array<any>>(this.apiProxy.Common.getOrderListForAdminToAssignManager(),ReqData)

  }
  getOrderListToAssignEmployee(ReqData : any){
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderListToAssignEmployee(),ReqData)

  }
  getTotalSubmitWorkDetailByOrderId(ReqData : any){
    return this.api.post<Array<any>>(this.apiProxy.Common.getTotalSubmitWorkDetailByOrderId(),ReqData)
  }
  getAssignListByOrderId(ReqData : any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.getAssignListByOrderId(),ReqData)
  }
  saveDailyWork(ReqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Common.saveDailyWork(),ReqData)
  }
}
