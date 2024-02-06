import { prop } from "@rxweb/reactive-form-validators";

export class SparesConsumableList{
    constructor(etl?: SparesConsumableList) {
        
        if (etl) {

            this.id = etl.id;
            this.enquiryId = etl.enquiryId;
            this.materialId = etl.materialId;
            this.materialName = etl.materialName;
            this.quantity = etl.quantity;
            this.materialAddedOn = etl.materialAddedOn;
            this.entryBy =etl.entryBy;
            this.rowStatus = etl.rowStatus;
            this.subCategoryId=etl.subCategoryId;
            this.subCategoryName=etl.subCategoryName;
            this.entryByName = etl.entryByName == null  ? "N/A" : etl.entryByName ;
       //      this.cost =etl.cost;
        //    this.enquiryId =etl.enquiryId;
          //  this.entryBy =etl.entryBy;
            //this.id =etl.id;
            //this.isActive =etl.isActive;
            //this.itemCode =etl.itemCode;
            //this.itemName =etl.itemName;
            //this.quantity =etl.quantity;
            //this.requestModifiedDate =etl.requestModifiedDate;
            //this.requestedDate =etl.requestedDate;
            //this.rowStatus =etl.rowStatus;
            // this.salePrice =etl.salePrice;
            // this.status =etl.status;
            // this.unit =etl.unit;
            // this.modifiedDate =etl.modifiedDate;
            // this.rowStatus =etl.rowStatus;
            

        }
        
            this.isDeleted = false;
    }


    // @prop()
    // cost :string;
    // @prop()
    // enquiryId :string;
    // @prop()
    // entryBy :string;
    // @prop()
    // id :number
    // @prop()
    // isActive :string;
    // @prop()
    // itemCode :string;
    // @prop()
    // itemName :string;
    // @prop()
    // quantity :string;
    // @prop()
    // requestModifiedDate :string;
    // @prop()
    // requestedDate :string;
    // @prop()
    // rowStatus :number;
    // @prop()
    // salePrice :string;
    // @prop()
    // status :string;
    // @prop()
    // unit :string;
    // @prop()
    // modifiedDate :string;

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
    entryBy :string;
    @prop()
    rowStatus: number;
    @prop()
    subCategoryId: number;
    @prop()
    subCategoryName: string;
    @prop()
    entryByName : string;
    @prop()
    isDeleted: boolean;
}