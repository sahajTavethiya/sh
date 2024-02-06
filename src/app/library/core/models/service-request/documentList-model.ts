import { prop } from "@rxweb/reactive-form-validators";

export class DocumentList{
    constructor(etl?: DocumentList) {
        
        if (etl) {
            this.category = etl.category;
            this.fileName = etl.fileName;
            this.filePath = etl.filePath;

        }
        this.isDeleted = false;
    }

    @prop()
    category: string;
    @prop()
    fileName: string;
    @prop()
    filePath: string;
    @prop()
    isDeleted: boolean;
}