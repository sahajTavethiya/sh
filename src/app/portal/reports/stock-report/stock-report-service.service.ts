import { Injectable, Injector } from '@angular/core';
import { ApiProxy } from 'src/app/library/core/constants/api-proxy';
import { ApiWrapperService } from 'src/app/library/shared/services/api/api-wrapper.service';
import { BaseService } from 'src/app/library/shared/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class StockReportServiceService  extends BaseService {

  constructor(injector: Injector, readonly api: ApiWrapperService,readonly apiProxy: ApiProxy) { 
    super(injector);
  }
  getMaterialStockReport(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.getMaterialStockReport(), reqData);
  }
  GetAllMaterial(){
    return this.api.get(this.apiProxy.ServiceRequest.GetAllMaterial())
  }
  viewServiceMaster( ){
    return this.api.get(this.apiProxy.ServiceRequest.getAllServiceMaster());
  }
}
