import { prop } from "@rxweb/reactive-form-validators";

export class RequestPermission {
    constructor() {
        // this.create = true;
        // this.edit = true;
        // this.delete = true;
    }

    @prop()
    create: boolean;
    @prop()
    edit: boolean;
    @prop()
    delete: boolean;
}