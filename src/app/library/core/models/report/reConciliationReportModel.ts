import { prop } from "@rxweb/reactive-form-validators";

export class ContractorReconciliationModel {
    constructor() {
    }

    @prop()
    fromDate: Date;
    @prop()
    toDate: Date;
    @prop()
    take: number;
    @prop()
    skip: Date;
    @prop()
    zones: Array<string>;
    @prop()
    employeeName : string;
    @prop()
    SubService : string;
}