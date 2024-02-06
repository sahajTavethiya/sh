import { prop, propArray, propObject } from "@rxweb/reactive-form-validators";
import { DailyWorkBasicDetail } from "./daily-work-basic-detail.model";

export class RequestContainer {
    constructor(container?: RequestContainer) {
        this.DailyWorkBasicDetail = new Array<DailyWorkBasicDetail>();
             
        if (container) {
          //  this.request = new RequestDetail(container.request);
            if (container.DailyWorkBasicDetail && container.DailyWorkBasicDetail.length > 0) {
                container.DailyWorkBasicDetail.forEach(etl => {
                   // etl.rowStatus = 2;
                    this.DailyWorkBasicDetail.push(new DailyWorkBasicDetail(etl));
                });
            }

        } else {
            // this.request = new RequestDetail();
        }
    }

    // @propObject(RequestDetail)
    // request: RequestDetail;

    @propArray(DailyWorkBasicDetail)
    DailyWorkBasicDetail: Array<DailyWorkBasicDetail>;

    
}