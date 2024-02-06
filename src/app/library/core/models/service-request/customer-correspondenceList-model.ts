import { prop } from "@rxweb/reactive-form-validators";

export class CustomerCorrespondenceList{
    constructor(etl?: CustomerCorrespondenceList) {
        
        if (etl) {
            this.delayReason = etl.delayReason;
            this.delaytime = etl.delaytime;
            this.houseAddressImage = etl.houseAddressImage;
            this.latitude = etl.latitude;
            this.longitude = etl.longitude;
            this.stageModifiedBy = etl.stageModifiedBy;
            this.startTime = etl.startTime;
            this.homeaddress = etl.homeaddress;

        }
        this.isDeleted = false;
    }

    @prop()
    delayReason: string;
    @prop()
    delaytime: string;
    @prop()
    houseAddressImage: string;
    @prop()
    latitude: number;
    @prop()
    longitude: string;
    @prop()
    stageModifiedBy: string;
    @prop()
    startTime: string;
    @prop()
    isDeleted: boolean;
    @prop()
    homeaddress: string;
}