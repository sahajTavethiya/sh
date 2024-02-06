import { prop } from "@rxweb/reactive-form-validators";

export class MaterialReportListModel {
    constructor() {
    }

    @prop()
    voucharNo:string;
    @prop()
    fromDate: Date;
    @prop()
    toDate: Date;
    @prop()
    zones: Date;
    @prop()
    vendors: Date;
}