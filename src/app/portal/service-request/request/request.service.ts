import { Injectable, Injector } from '@angular/core';
import { RequestContainer } from 'src/app/library/core/models/service-request/request-container.model';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  getRequest = (requestId: number) => this.api.get(this.apiProxy.ServiceRequest.getRequest(requestId));
  getMaterials = () => this.api.get(this.apiProxy.ServiceRequest.getMaterials());

  saveRequest = (requestContainer: RequestContainer) => this.api.post(this.apiProxy.ServiceRequest.save(), requestContainer);
  updateStageModifiedBy = (data: any) => this.api.post(this.apiProxy.ServiceRequest.updateStageModifiedBy(), data);
  changeStatus = (data: any) => this.api.post(this.apiProxy.ServiceRequest.changeStatus(), data);
  getSRAvailableManpower = (data: any) => this.api.post(this.apiProxy.ServiceRequest.getSRAvailableManpower(), data);
  getCustomer = (data: any) => this.api.post(this.apiProxy.ServiceRequest.getCustomer(), data);
  uploadCustomerSignature = (data: any) => this.api.post(this.apiProxy.ServiceRequest.uploadCustomerSignature(), data);
  callRecordingUpload = (data: any) => this.api.post(this.apiProxy.ServiceRequest.callRecordingUpload(), data);
  JMR = (requestId: number) => this.api.get1(this.apiProxy.ServiceRequest.JMR(requestId));
  ServiceDocs = (requestId: number) => this.api.get1(this.apiProxy.ServiceRequest.ServiceDocs(requestId));
  viewImage = (requestId: number, name: any) => this.api.get1(this.apiProxy.ServiceRequest.viewImage(requestId, name));
  srListUpdate = (data: any) => this.api.post(this.apiProxy.ServiceRequest.srListUpdate(), data);
  ChangePassword = (OldPassword: any, NewPassword: any) => this.api.get(this.apiProxy.ServiceRequest.ChangePassword(OldPassword, NewPassword));
  CancelRequest = (id: any) => this.api.get(this.apiProxy.ServiceRequest.CancelRequest(id));
  UploadImageOfIsometricGraph(reqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.UploadImageOfIsometricGraph(), reqData);
  }
}
