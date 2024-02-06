import { prop, propArray, propObject } from "@rxweb/reactive-form-validators";
import { OrderAssignModel } from "./order_assign.model";

export class OrderAssignMainModel {
    constructor(container?: OrderAssignMainModel) {
        this.request = new Array<OrderAssignModel>();
        if (container) {
            if (container.request && container.request.length > 0) {
                container.request.forEach(etl => {
                    // etl.rowStatus = 2;
                    this.request.push(new OrderAssignModel(etl));
                });
            }
        } else {
            this.request = new Array<OrderAssignModel>();
        }
    }

    @propArray(OrderAssignModel)
    request: Array<OrderAssignModel>;

}