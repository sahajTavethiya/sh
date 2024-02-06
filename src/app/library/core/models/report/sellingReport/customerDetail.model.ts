import { prop } from "@rxweb/reactive-form-validators";

export class CustomerDetail {
    constructor(etl?: CustomerDetail) {
        
        if (etl) {
            this.customerName = etl.customerName;
            this.emailId = etl.emailId;
            this.address = etl.address;
            this.mobile = etl.mobile;
            this.gstNo = etl.gstNo;
            this.isGst = etl.isGst;
            this.stateAndCode = etl.stateAndCode;
            }
    }
    @prop()
    customerName: string;
    @prop()
    emailId: string;
    @prop()
    address: string;
    @prop()
    mobile: string;
    @prop()
    gstNo: string;
    @prop()
    stateAndCode: string;
    @prop()
    isGst: boolean;
}