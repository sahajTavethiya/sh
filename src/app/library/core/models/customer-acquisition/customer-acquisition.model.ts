import { prop, propArray, propObject } from "@rxweb/reactive-form-validators";
import { CustomerAcquisitionDetail } from "./customer-acquisition-detail.model";

export class CustomerAcquisitionContainer {
    constructor(container?: CustomerAcquisitionContainer) {
        
        // console.log('container',container)
        if (container) {
            this.request = new CustomerAcquisitionDetail(container.request);
            
        } else {
            this.request = new CustomerAcquisitionDetail();
        }
    }

    @propObject(CustomerAcquisitionDetail)
    request: CustomerAcquisitionDetail;

    
}