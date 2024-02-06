import { prop } from "@rxweb/reactive-form-validators";

export class DashboardCriteria {
    constructor() {
    }

    @prop()
    dateString: string;
    @prop()
    zoneIds: Array<number>;
    @prop()
    serviceIds: Array<number>;
    @prop()
    clientId: number;
    @prop()
    fromDate : Date;
    @prop()
    toDate :Date;
}