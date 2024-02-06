import { Injectable, Injector } from '@angular/core';
import { SearchSRCriteria } from 'src/app/library/core/models/service-request/search-sr-criteria.model';
import { SearchSRResultModel } from 'src/app/library/core/models/service-request/search-sr-result.model';
import { BaseService } from 'src/app/library/shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseService {

  constructor(injector: Injector,private  http: HttpClient) {
    super(injector);
  }

  initializeSearch() {
    return this.api.get(this.apiProxy.ServiceRequest.initializeSearch());
  }

  pe_tracker(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.pe_tracker(), data);
  }
  GetBillReport(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.GetBillReport(), data);
  }
  HelpdeskSr1(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.HelpdeskSr1(), data);
  }
  GetTATReport(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.GetTATReport(), data);
  }
  ManpowerPerformance(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.ManpowerPerformance(), data);
  }
  GetEmployeeListByZoneId(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.GetEmployeeListByZoneId(), data);
  }
  InComplete(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.InComplete(), data);
  }
  callCenter(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.callCenter(), data);
  }
  AttendanceReport(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.AttendanceReport(), data);
  }
  getAllApplicationUserForAttendanceReport(){
    return this.api.get(this.apiProxy.ServiceRequest.getAllApplicationUserForAttendanceReport())
  }

  DownloadJMRs(data:any) {
    return this.api.post1<Array<any>>(this.apiProxy.ServiceRequest.DownloadJMRs(), data);
    
  }
  // zohoLogin(){
  //   console.log("its in api");
    
  //   return this.http.get("https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.WJVR8PM7YZMMWPXEPLBCVK1ZLV1F9M&scope=email&redirect_uri=http://103.251.94.95:806")
  // }
  GetProjectReport(data:any) {
    return this.api.post<Array<any>>(this.apiProxy.ServiceRequest.GetProjectReport(), data);
  }
  GetUserByRoleId = () => this.api.get(this.apiProxy.ServiceRequest.GetUserByRoleId(4));

  
  downloadCallRecording = (customerID: any,srNumber:any,phoneNo:any,callType:any,callTime:any,fileName:any) => this.api.get1(this.apiProxy.ServiceRequest.downloadCallRecording(customerID,srNumber,phoneNo,callType,callTime,fileName));

  viewImage = (requestId: number,name:any) => this.api.get1(this.apiProxy.ServiceRequest.viewImage(requestId,name));
  getAllApplicationUser(){
    return this.api.get(this.apiProxy.ServiceRequest.getAllApplicationUser())
  }

}
