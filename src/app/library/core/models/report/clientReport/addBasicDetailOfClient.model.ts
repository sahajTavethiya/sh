import { prop } from "@rxweb/reactive-form-validators";

export class AddBasicDetailOfClient {
    constructor(etl?: AddBasicDetailOfClient) {

        if (etl) {
            this.ClientName = etl.ClientName;
            this.EmailId = etl.EmailId;
            this.Mobile = etl.Mobile;
            this.Address = etl.Address;
            this.StateAndCode = etl.StateAndCode;
            this.GST_No = etl.GST_No;


        }
    }
    @prop()
    ClientName: string;
    @prop()
    EmailId: string;
    @prop()
    Mobile: string;
    @prop()
    Address: string;
    @prop()
    StateAndCode: string;
    @prop()
    GST_No: string;
}