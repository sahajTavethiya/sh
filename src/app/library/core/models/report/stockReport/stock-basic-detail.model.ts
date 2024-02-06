import { prop } from "@rxweb/reactive-form-validators";

export class AddBasicDetailOfStock {
    constructor(etl?: AddBasicDetailOfStock) {
        
        if (etl) {
            this.StockItemId = etl.StockItemId;
            this.NoOfItem = etl.NoOfItem;
            this.Rate = etl.Rate;
            this.ColourId = etl.ColourId;
            this.MeterPerItem = etl.MeterPerItem;
            }
    }
    @prop()
    StockItemId: Number;
    @prop()
    NoOfItem: number;
    @prop()
    Rate: number;
    @prop()
    ColourId: number;
    @prop()
    MeterPerItem: number;
    @prop()
    SizeId: number;
}