import { Injectable, Injector } from '@angular/core';
import { SearchSRCriteria } from 'src/app/library/core/models/service-request/search-sr-criteria.model';
import { SearchSRResultModel } from 'src/app/library/core/models/service-request/search-sr-result.model';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SRDashboardService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  initializeSearch() {
    return this.api.get(this.apiProxy.ServiceRequest.initializeSearch());
  }

  search(searchCriteria: SearchSRCriteria) {
//  searchCriteria.statusIds= new Array<string>();
 // searchCriteria.statusIds=["3"];
    return this.api.post<Array<SearchSRResultModel>>(this.apiProxy.ServiceRequest.searchServiceRequest(), searchCriteria);
  }
  callPhone(id:any) {
    return this.api.get(this.apiProxy.ServiceRequest.callPhone(id));
  }

  makecall(data:any) {
    //return this.api.makecall("https://kpi.knowlarity.com/Basic/v1/account/call/makecall", data);
    return this.api.makecall("http://etsrds.kapps.in/webapi/enterprise/v1/makecall.py", data);
  }
  logoutNET() {
    return this.api.logoutNET("/Account/LogoutApp");

  }
  BulkGeneratePDF() {
    return this.api.get(this.apiProxy.ServiceRequest.BulkGeneratePDF());
  }

  GetManpowerForBulkAssigned(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.GetManpowerForBulkAssigned(), data);
  }

  SaveManpowerForBulkAssigned(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.SaveManpowerForBulkAssigned(), data);
  }

  
}
