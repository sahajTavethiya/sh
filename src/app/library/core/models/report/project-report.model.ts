import { prop } from "@rxweb/reactive-form-validators";

export class SearchSRCriteria {
    constructor() {
    }

   
    @prop()
    requestFrom: Date;
    @prop()
    requestTo: Date;

}