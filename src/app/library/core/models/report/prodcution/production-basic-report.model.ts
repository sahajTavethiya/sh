import { prop } from "@rxweb/reactive-form-validators";

export class ProductionBasicDetail {
    constructor(etl?: ProductionBasicDetail) {
        if (etl) {
            this.tblId = etl.tblId;
            this.productId = etl.productId;
           this.designId = etl.designId;
           this.noOfPiece = etl.noOfPiece;
           this.sizeId = etl.sizeId;
           this.colourId = etl.colourId;
           this.designName = etl.designName;
           this.productName = etl.productName;
           this.sizeName = etl.sizeName;
           this.colourName = etl.colourName;
            this.isDelete = etl.isDelete;
        }
    }
    @prop()
    tblId:number;
    @prop()
    productId:number;
    @prop()
    designId: number;
    @prop()
    noOfPiece: number;
    @prop()
    sizeId: number;
    @prop()
    colourId: number;
    @prop()
    isDelete : number;
    @prop()
    designName : string;
    @prop()
    productName : string;
    @prop()
    sizeName : string;
    @prop()
    colourName : string;
}