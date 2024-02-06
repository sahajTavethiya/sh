import { prop } from "@rxweb/reactive-form-validators";

export class OrderAssignModel {
    constructor(etl?: OrderAssignModel) {

        if (etl) {
            this.tblId = etl.tblId;
            this.assignToId = etl.assignToId;
            this.assignById = etl.assignById;
            this.orderId = etl.orderId;
            this.productId = etl.productId;
            this.assignTotalPiece = etl.assignTotalPiece;
            this.workRatePerPiece = etl.workRatePerPiece;
            this.isDelete = etl.isDelete;
            this.assignEmployeeName = etl.assignEmployeeName;
        }
    }
    @prop()
    tblId: Number;
    @prop()
    assignToId: number;
    @prop()
    assignById: number;
    @prop()
    assignEmployeeName : string;
    @prop()
    orderId: number;
    @prop()
    productId: number;
    @prop()
    assignTotalPiece: number;
    @prop()
    workRatePerPiece: number;
    @prop()
    isDelete: number;
}