import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class AddCustomerService extends BaseService{

  constructor(injector: Injector) { super(injector);}

  GetAllActiveZone(){
    return this.api.get(this.apiProxy.ServiceRequest.GetAllActiveZone());
  }
  getAllActiveZoneCityCountry(){
    return this.api.get(this.apiProxy.ServiceRequest.getAllActiveZoneCityCountry());
  }
  saveManpower(Data : any){
    return this.api.post(this.apiProxy.ServiceRequest.saveEmployee(),Data)
  }
  getAllAppRole(){
    return this.api.get(this.apiProxy.ServiceRequest.getAllAppRole());
  }
  UploadFileOfEmployee(data:any){
    return this.api.post(this.apiProxy.ServiceRequest.UploadFileOfEmployee(),data)
  }
  UpdateAppUserDocumentPath(data:any){
    return this.api.post(this.apiProxy.ServiceRequest.UpdateAppUserDocumentPath(),data)
  }
}
