import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class StockCMService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
  getStockReport(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.getStockReport(), reqData);
  }
  addStock(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.addStock(), reqData);
  }
}
