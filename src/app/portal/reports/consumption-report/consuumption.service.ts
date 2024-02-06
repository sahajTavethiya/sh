import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ConsuumptionService  extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  initializeSearch() {
    return this.api.get(this.apiProxy.ServiceRequest.initializeSearch());
  }

  comsumptionsearch(searchCriteria: any) {//SearchSRCriteria
    
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.getConsumptionReport(), searchCriteria);
  }

  
  viewServiceMaster( ){
    return this.api.get(this.apiProxy.ServiceRequest.getAllServiceMaster());
  }
  GetEmployeeListByZoneIdAndTypeId(data:any){
    return this.api.post(this.apiProxy.ServiceRequest.GetEmployeeListByZoneIdAndTypeId(),data);
  }
 
  
}
