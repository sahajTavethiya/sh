import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }


 getStatusDropdownValuesForSRList(currentStatus: any, totalStatuses: Array<any>, serviceId?: string) {
   console.log('totalStatuses');
   console.log(totalStatuses);
    let filteredStages: string[] = [];
    switch (currentStatus) {
      case this.constants.ServiceStages.WaitingForApproval:
        filteredStages.push(this.constants.ServiceStages.WaitingForApproval);
       // filteredStages.push(this.constants.ServiceStages.NonWorkable);
        filteredStages.push(this.constants.ServiceStages.InQueue);
        filteredStages.push(this.constants.ServiceStages.Cancle);
        break;
      case this.constants.ServiceStages.InQueue:
        // filteredStages.push(this.constants.ServiceStages.Assigned);
        // filteredStages.push(this.constants.ServiceStages.InQueue);
        filteredStages.push(this.constants.ServiceStages.Cancle);
        break;
      case this.constants.ServiceStages.Assigned:
        // filteredStages.push(this.constants.ServiceStages.Assigned);
        // filteredStages.push(this.constants.ServiceStages.InProgress);
        filteredStages.push(this.constants.ServiceStages.Cancle);
        break;
      case this.constants.ServiceStages.InProgress:
        // filteredStages.push(this.constants.ServiceStages.InProgress);
        // filteredStages.push(this.constants.ServiceStages.Delay);
        // filteredStages.push(this.constants.ServiceStages.Completed);
        // filteredStages.push(this.constants.ServiceStages.NonWorkable);
        filteredStages.push(this.constants.ServiceStages.Cancle);
        break;
      case this.constants.ServiceStages.Delay:
        // filteredStages.push(this.constants.ServiceStages.Delay);
        // filteredStages.push(this.constants.ServiceStages.Completed);
        filteredStages.push(this.constants.ServiceStages.Cancle);
        break;
      case this.constants.ServiceStages.NonWorkable:
        // filteredStages.push(this.constants.ServiceStages.NonWorkable);
        // filteredStages.push(this.constants.ServiceStages.Assigned);
        filteredStages.push(this.constants.ServiceStages.Cancle);
        break;
      case this.constants.ServiceStages.Completed:
        //filteredStages.push(this.constants.ServiceStages.Completed);
        if (serviceId === this.constants.Services.RFC) {
          // filteredStages.push(this.constants.ServiceStages.ReviewComplete);
          filteredStages.push(this.constants.ServiceStages.Cancle);
        } else {
         // filteredStages.push(this.constants.ServiceStages.Closed);
          filteredStages.push(this.constants.ServiceStages.Cancle);
        }
        break;
      case this.constants.ServiceStages.ReviewComplete:
      //  filteredStages.push(this.constants.ServiceStages.ReviewComplete);
        // filteredStages.push(this.constants.ServiceStages.Closed);
        filteredStages.push(this.constants.ServiceStages.Cancle);
        break;
      case this.constants.ServiceStages.Closed:
        filteredStages.push(this.constants.ServiceStages.Closed);
        break;
    }

    return totalStatuses.filter(status => {
      return filteredStages.includes(status.keyName);
    });
  }
  getStatusDropdownValues(currentStatus: any, totalStatuses: Array<any>, serviceId?: string) {
    console.log('totalStatuses');
    console.log(totalStatuses);
     let filteredStages: string[] = [];
     switch (currentStatus) {
       case this.constants.ServiceStages.WaitingForApproval:
         filteredStages.push(this.constants.ServiceStages.WaitingForApproval);
         filteredStages.push(this.constants.ServiceStages.InQueue);
         filteredStages.push(this.constants.ServiceStages.Cancle);
         break;
       case this.constants.ServiceStages.InQueue:
          filteredStages.push(this.constants.ServiceStages.Assigned);
         filteredStages.push(this.constants.ServiceStages.InQueue);
         filteredStages.push(this.constants.ServiceStages.Cancle);
         break;
       case this.constants.ServiceStages.Assigned:
          filteredStages.push(this.constants.ServiceStages.Assigned);
          filteredStages.push(this.constants.ServiceStages.InProgress);
         filteredStages.push(this.constants.ServiceStages.Cancle);
         break;
       case this.constants.ServiceStages.InProgress:
          filteredStages.push(this.constants.ServiceStages.InProgress);
          filteredStages.push(this.constants.ServiceStages.Delay);
          filteredStages.push(this.constants.ServiceStages.Completed);
          filteredStages.push(this.constants.ServiceStages.NonWorkable);
         filteredStages.push(this.constants.ServiceStages.Cancle);
         break;
       case this.constants.ServiceStages.Delay:
          filteredStages.push(this.constants.ServiceStages.Delay);
          filteredStages.push(this.constants.ServiceStages.Completed);
         filteredStages.push(this.constants.ServiceStages.Cancle);
         break;
       case this.constants.ServiceStages.NonWorkable:
          filteredStages.push(this.constants.ServiceStages.NonWorkable);
          filteredStages.push(this.constants.ServiceStages.Assigned);
         filteredStages.push(this.constants.ServiceStages.Cancle);
         break;
       case this.constants.ServiceStages.Completed:
         filteredStages.push(this.constants.ServiceStages.Completed);
         if (serviceId === this.constants.Services.RFC) {
            filteredStages.push(this.constants.ServiceStages.ReviewComplete);
           filteredStages.push(this.constants.ServiceStages.Cancle);
         } else {
           filteredStages.push(this.constants.ServiceStages.Closed);
           filteredStages.push(this.constants.ServiceStages.Cancle);
         }
         break;
       case this.constants.ServiceStages.ReviewComplete:
         filteredStages.push(this.constants.ServiceStages.ReviewComplete);
          filteredStages.push(this.constants.ServiceStages.Closed);
         filteredStages.push(this.constants.ServiceStages.Cancle);
         break;
       case this.constants.ServiceStages.Closed:
         filteredStages.push(this.constants.ServiceStages.Closed);
         break;
     }
 
     return totalStatuses.filter(status => {
       return filteredStages.includes(status.keyName);
     });
   }
   GetEmployeeListByZoneIdAndTypeId(data:any){
    return this.api.post(this.apiProxy.ServiceRequest.GetEmployeeListByZoneIdAndTypeId(),data);
  }
}
