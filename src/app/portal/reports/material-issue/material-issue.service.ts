import { Injectable ,Injector} from '@angular/core';
import { ApiProxy } from 'src/app/library/core/constants/api-proxy';
import { ApiWrapperService } from 'src/app/library/shared/services/api/api-wrapper.service';
import { BaseService } from 'src/app/library/shared/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class MaterialIssueService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }
  //constructor(readonly api: ApiWrapperService,readonly apiProxy: ApiProxy) { }

  getAllMaterialIssue(data:any){
     return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.getAllMaterialissue(),data);
     
   }
   getAllMaterialIssueForExcelExport(data:any){
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.getAllMaterialIssueForExcelExport(),data);

   }
   materialIssueDetail(data:any){
    return this.api.get2<Array<any>>(this.apiProxy.ServiceRequest.materialIssueDetail(data),data);

   }
   
   meterialsearch(searchCriteria: any) {//SearchSRCriteria
    
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.materialReceipt(), searchCriteria);
  }
////////////////////////////
  ServiceDocs(data : any){
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.materialReceipt(), data);
  }
  viewImage(id:any,name:any){
    
  }
///////////////////////
downloadMaterialIssueFile(documentName :any){
  return this.api.get1<Array<any>>(this.apiProxy.ServiceRequest.downloadMaterialIssueFile(documentName));
}
saveMaterialIssue(reqData:any){
  return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.saveMaterialIssue(), reqData);
}
downloadPDF(id:number){
  return this.api.get1<Array<any>>(this.apiProxy.ServiceRequest.downloadPDF_ForMI(id));
}
updateMINotes(data : any){
  return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.updateMINotes(), data);
}
GetAllEmployees(){
  return this.api.get(this.apiProxy.ServiceRequest.GetAllEmployees())
}
GetAllMaterial(){
  return this.api.get(this.apiProxy.ServiceRequest.GetAllMaterial())
}
}
