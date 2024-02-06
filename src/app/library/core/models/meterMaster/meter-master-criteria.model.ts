import { prop } from "@rxweb/reactive-form-validators";

export class MeterMasterCriteria {
    constructor() {
    }

    @prop()
    meterNo: Array<string>;
    @prop()
    zoneIds: Array<number>;
    @prop()
    status: string;
    @prop()
    serviceForId: number;
    @prop()
    skip: number;
    @prop()
    take: number;
    @prop()
    orderBy: string;
    @prop()
    search: string;
}