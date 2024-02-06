import { Injectable, Injector } from '@angular/core';
import { SearchSRCriteria } from 'src/app/library/core/models/service-request/search-sr-criteria.model';
import { SearchSRResultModel } from 'src/app/library/core/models/service-request/search-sr-result.model';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CADashboardService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  initializeSearch() {
    return this.api.get(this.apiProxy.ServiceRequest.initializeSearch());
  }

  Customersearch(searchCriteria: any) {//SearchSRCriteria
    
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.Customersearch(), searchCriteria);
  }

 
 


  
}
