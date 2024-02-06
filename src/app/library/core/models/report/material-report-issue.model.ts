import { prop,RxwebValidators } from "@rxweb/reactive-form-validators";

export class MaterialReportIssueListModel {
    constructor() {
    }

    @prop()
    fromDate: Date;
    @prop()
    toDate: Date;
    @prop()
    zones: Date;
    @prop()
    IssuedTo: Array<string>;
    @prop()
    ItemName: Array<string>;
}