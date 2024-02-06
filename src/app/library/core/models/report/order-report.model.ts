import { prop } from "@rxweb/reactive-form-validators";

export class OrderReportModel {
    constructor() {
    }

    @prop()
    workTypeId: number;
    @prop()
    designId: Array<number>;
    @prop()
    clientId: string;
    @prop()
    productId: Array<string>;
    @prop()
    billNo: Date;
    @prop()
    statusId: Date;
    @prop()
    fromDate: Date;
    @prop()
    toDate: Date;
}