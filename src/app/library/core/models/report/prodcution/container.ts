import { prop, propArray, propObject } from "@rxweb/reactive-form-validators";
import { ProductionBasicDetail } from "./production-basic-report.model";

export class ProductionReportContainer {
    constructor(container?: ProductionReportContainer) {
        this.ProductionBasicDetail = new Array<ProductionBasicDetail>();
             
        if (container) {
          //  this.request = new RequestDetail(container.request);
            if (container.ProductionBasicDetail && container.ProductionBasicDetail.length > 0) {
                container.ProductionBasicDetail.forEach(etl => {
                   // etl.rowStatus = 2;
                    this.ProductionBasicDetail.push(new ProductionBasicDetail(etl));
                });
            }

        } else {
            // this.request = new RequestDetail();
        }
    }

    // @propObject(RequestDetail)
    // request: RequestDetail;

    @propArray(ProductionBasicDetail)
    ProductionBasicDetail: Array<ProductionBasicDetail>;

    
}