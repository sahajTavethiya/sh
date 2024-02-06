import { Injectable, Injector } from '@angular/core';
import { RequestContainer } from 'src/app/library/core/models/service-request/request-container.model';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AssignTaskDetailService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  getAssignListByOrderId = (data: any) => this.api.post(this.apiProxy.Admin.getAssignListByOrderId(), data);
  getMaterials = () => this.api.get(this.apiProxy.ServiceRequest.getMaterials());
  assignTaskToEmployee = (data: any) => this.api.post(this.apiProxy.Admin.assignTaskToEmployee(), data);



}
