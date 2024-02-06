import { Injectable, Injector } from '@angular/core';
import { CustomerAcquisitionContainer } from 'src/app/library/core/models/customer-acquisition/customer-acquisition.model';
import { RequestContainer } from 'src/app/library/core/models/service-request/request-container.model';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAcquisitionAddEditService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  getbyId = (requestId: number) => this.api.get(this.apiProxy.ServiceRequest.getbyId(requestId));
  getMaterials = () => this.api.get(this.apiProxy.ServiceRequest.getMaterials());

  CustomerAcquistion = (CustomerAcquisitionContainer: CustomerAcquisitionContainer) => this.api.post(this.apiProxy.ServiceRequest.CustomerAcquistionSave(), CustomerAcquisitionContainer);
  customerMasterReject = (data: any) => this.api.post(this.apiProxy.ServiceRequest.customerMasterReject(), data);

}
