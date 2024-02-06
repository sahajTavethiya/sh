import { prop } from "@rxweb/reactive-form-validators";

export class EnquiryTaskLine {
    constructor(etl?: EnquiryTaskLine) {
        if (etl) {
            this.id = etl.id;
            this.enquiryId = etl.enquiryId;
            this.categoryId = etl.categoryId;
            this.subCategoryId = etl.subCategoryId;
            this.price = etl.price;
            this.quantity = etl.quantity;
            this.total = etl.total;
            this.actualPrice = etl.actualPrice;
            this.actualQuantity = etl.actualQuantity;
            this.actualTotal = etl.actualTotal;
            this.createdBy = etl.createdBy;
            this.modifiedBy = etl.modifiedBy;
            this.rowStatus = etl.rowStatus;
            this.category = etl.category;
            this.subCategory = etl.subCategory;
            this.taskType = etl.taskType;
            this.status = etl.status;
        }
        this.isDeleted = false;
    }

    @prop()
    id: number;
    @prop()
    enquiryId: number;
    @prop()
    categoryId: number;
    @prop()
    subCategoryId: number;
    @prop()
    price: number;
    @prop()
    quantity: number;
    @prop()
    total: number;
    @prop()
    actualPrice: number;
    @prop()
    actualQuantity: number;
    @prop()
    actualTotal: number;
    @prop()
    createdBy: string;
    @prop()
    modifiedBy: string;
    @prop()
    rowStatus: number;
    @prop()
    category: string;
    @prop()
    subCategory: string;
    @prop()
    taskType: string;
    @prop()
    status: string;
    @prop()
    isDeleted: boolean;
}