import { prop, propArray, propObject } from "@rxweb/reactive-form-validators";
import { CustomerDetail } from "./customerDetail.model";
import { SellProductDetail } from "./sellProductDetail.model";

export class SellingContainer {
    constructor(container?: SellingContainer) {
       this.SellProductDetail = new Array<SellProductDetail>();
             
        if (container) {
           this.request = new CustomerDetail(container.request);
            if (container.SellProductDetail && container.SellProductDetail.length > 0) {
                container.SellProductDetail.forEach(etl => {
                   // etl.rowStatus = 2;
                    this.SellProductDetail.push(new SellProductDetail(etl));
                });
            }

        } else {
             this.request = new CustomerDetail();
        }
    }

    @propObject(CustomerDetail)
    request: CustomerDetail;

    @propArray(SellProductDetail)
    SellProductDetail: Array<SellProductDetail>;

    
}