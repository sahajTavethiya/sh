import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class MeterMasterService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  getMeterMakeMaster(criteria: any) {
    return this.api.post(this.apiProxy.ServiceRequest.getMeterMakeMaster(), criteria);
  }
}
