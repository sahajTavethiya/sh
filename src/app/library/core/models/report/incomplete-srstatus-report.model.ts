import { prop } from "@rxweb/reactive-form-validators";

export class IncompleteSRStatusReportModel {
    constructor() {
    }

    @prop()
    srNumbers: Array<string>;
    @prop()
    customerIds: Array<string>;
    @prop()
    mobile: string;
    @prop()
    serviceIds: Array<string>;
    @prop()
    requestFrom: Date;
    @prop()
    requestTo: Date;
    @prop()
    zones: Array<string>;    
    @prop()
    priority: string;
    @prop()
    statusIds: Array<string>;
    @prop()
    serviceForId: number;
    @prop()
    gasStatus: string;
    @prop()
    kycStatus: string;
    

}