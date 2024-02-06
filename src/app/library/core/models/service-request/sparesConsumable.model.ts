import { prop } from "@rxweb/reactive-form-validators";

export class SpareConsumable {
    constructor(sc?: SpareConsumable) {
        if (sc) {
            this.id = sc.id;
            this.enquiryId = sc.enquiryId;
            this.materialId = sc.materialId;
            this.materialName = sc.materialName;
            this.quantity = sc.quantity;
            this.materialAddedOn = sc.materialAddedOn;
            this.entryBy = sc.entryBy;
            this.rowStatus = sc.rowStatus;
        }
        //if (sc) {
          //  this.id = sc.id;
//            this.enquiryId = sc.enquiryId;
  //          this.itemCode = sc.itemCode;
    //        this.unit = sc.unit;
      //      this.cost = sc.cost;
        //    this.quantity = sc.quantity;
          //  this.status = sc.status;
            //this.salePrice = sc.salePrice;
            //this.requestedDate = sc.requestedDate;
            //this.requestModifiedDate = sc.requestModifiedDate;
            //this.isActive = sc.isActive;
            //this.entryBy = sc.entryBy;
            //this.rowStatus = sc.rowStatus;
            //this.itemName = sc.itemName;
        //}
    }

    @prop()
    id: number;
    @prop()
    enquiryId: number;
    @prop()
    materialId: number;
    @prop()
    materialName: string;
    @prop()
    quantity: number;
    @prop()
    materialAddedOn: string;
    @prop()
    entryBy: string;
    @prop()
    rowStatus: number;
}