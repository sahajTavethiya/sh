import { Injectable, Injector } from '@angular/core';
import { ApiProxy } from 'src/app/library/core/constants/api-proxy';
import { ApiWrapperService } from 'src/app/library/shared/services/api/api-wrapper.service';
import { BaseService } from 'src/app/library/shared/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class MaterialReportDetailService  extends BaseService {

 // constructor(readonly api: ApiWrapperService,readonly apiProxy: ApiProxy) { }
  constructor(injector: Injector, readonly api: ApiWrapperService,readonly apiProxy: ApiProxy) {
    super(injector);
  }
  MatrialReciptDetailsById(id:Number,token:any){
    return this.api.get2(this.apiProxy.ServiceRequest.MatrialReciptDetailsById(id),token)
  }
  downloadMaterialReceiptFile(documentName :any){
    return this.api.get1<Array<any>>(this.apiProxy.ServiceRequest.downloadMaterialReceiptFile(documentName));
  }
  saveMaterialReceipt(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.saveMaterialReceipt(), reqData);
  }
  downloadPDF(id:number){
    return this.api.get1<Array<any>>(this.apiProxy.ServiceRequest.downloadPDF(id));
  }
  getAllVendor(){
    return this.api.get<Array<any>>(this.apiProxy.ServiceRequest.getAllVendor())
  }
  updateMRVenodorAndNote(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.updateMRVenodorAndNote(), reqData);
  }
  downloadDPR_Image(id:any){
    return this.api.get1<Array<any>>(this.apiProxy.ServiceRequest.downloadDPR_Image(id));
  }
}
