import { prop } from "@rxweb/reactive-form-validators";

export class SellProductDetail {
    constructor(etl?: SellProductDetail) {
        
        if (etl) {
            this.tblId = etl.tblId;
            this.sellingMasterId = etl.sellingMasterId;
            this.hsnCode = etl.hsnCode;
            this.hsnCodeId = etl.hsnCodeId;
            this.qty = etl.qty;
            this.rate = etl.rate;
            this.isGst = etl.isGst;
            this.productId = etl.productId;
            this.designId = etl.designId;
            this.colourId = etl.colourId;
            this.sizeId = etl.sizeId;
            this.isGst = etl.isGst;
            this.isDelete = etl.isDelete;
            this.productName = etl.productName;
            this.designName = etl.designName;
            this.colourName = etl.colourName;
            this.sizeName = etl.sizeName;
            }
    }
    @prop()
    tblId: number;
    @prop()
    sellingMasterId: string;
    @prop()
    hsnCode: string;
    @prop()
    hsnCodeId: number;
    @prop()
    qty: number;
    @prop()
    rate: string;
    @prop()
    productId: string;
    @prop()
    designId: number;
    @prop()
    colourId: number;
    @prop()
    sizeId: number;
    @prop()
    isGst: boolean;
    @prop()
    isDelete: number;
    @prop()
    productName: string;
    @prop()
    designName: string;    
    @prop()
    colourName: string;    
    @prop()
    sizeName: string;
}