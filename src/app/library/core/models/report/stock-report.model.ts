import { prop,RxwebValidators } from "@rxweb/reactive-form-validators";

export class stockReportModel {
    constructor() {
    }

    @prop()
    toDate: Date;
    @prop()
    zones: Date;
    @prop()
    ItemName: Array<string>;
    @prop()
    MaterialCategory: Array<string>;
}