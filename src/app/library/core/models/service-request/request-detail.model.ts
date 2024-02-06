import { formatDate, Time } from "@angular/common";
import { prop } from "@rxweb/reactive-form-validators";

export class RequestDetail {
    constructor(req?: RequestDetail) {
        if (req) {
            this.id = req.id;
            this.cityId = req.cityId ? req.cityId.toString() : null;
            this.mobileNo = req.mobileNo;
            this.serviceId = req.serviceId ? req.serviceId.toString() : null;
            this.enquiryDate = req.enquiryDate;
            this.enquiryStatus = req.enquiryStatus ? req.enquiryStatus.toString() : null;
            this.currentEnquiryStatus = this.enquiryStatus;
            this.currentEnquiryStatusValue = '';
            this.serviceGroupId = req.serviceGroupId ? req.serviceGroupId.toString() : null;
            this.categoryId = req.categoryId;
            this.customerId = req.customerId;
            this.subCategoryId = req.subCategoryId;
            this.price = req.price;
            this.preferredDate = req.preferredDate;
            this.preferredTime = req.preferredTime;
            this.unattendedReason = req.unattendedReason;
            this.description = req.description;
            this.name = req.name;
            this.emailId = req.emailId;
            this.streetLocality = req.streetLocality;
            this.houseNo = req.houseNo;
            this.landMark = req.landMark;
            this.blockTower = req.blockTower;
            this.requestType = req.requestType;
            this.serviceFor = req.serviceFor ? req.serviceFor.toString() : null;
            this.isReadOnce = req.isReadOnce;
            this.createdBy = req.createdBy;
            this.priority = req.priority;
            this.delayReason = req.delayReason;
            this.stageModifiedOn = req.stageModifiedOn;
            this.stageModifiedBy = req.stageModifiedBy;
            this.isReferral = req.isReferral;
            this.inProgressTime = req.inProgressTime;
            this.isInProgress = req.isInProgress;
            this.serviceCardImage = req.serviceCardImage;
            this.houseAddressImage = req.houseAddressImage;
            this.meterImage = req.meterImage;
            this.applianceImage = req.applianceImage;
            this.feedbackImage = req.feedbackImage;
            this.serviceName = req.serviceName;
            this.currentZoneValue = '';
            this.currentClientValue = '';
            this.pressureGuageMake = req.pressureGuageMake;
            this.pressureGuageMakeNo = req.pressureGuageMakeNo;
            this.gaugeCalibrationValidityFromDate = req.gaugeCalibrationValidityFromDate;
            this.gaugeCalibrationValidityFromTo = req.gaugeCalibrationValidityFromTo;
            this.holdingTime = req.holdingTime;
            this.isModify = req.isModify;
        }
    }

    @prop()
    id: number;

    @prop()
    cityId: string | null;

    @prop()
    mobileNo: string;

    @prop()
    serviceId: string | null;

    @prop()
    enquiryDate: Date;

    @prop()
    enquiryStatus: string | null;

    @prop()
    currentEnquiryStatus: string | null;

    @prop()
    currentEnquiryStatusValue: string;

    @prop()
    currentZoneValue: string;

    @prop()
    currentClientValue: string;

    @prop()
    serviceGroupId: string | null;

    @prop()
    categoryId: number;

    @prop()
    customerId: string;

    @prop()
    subCategoryId: number;

    @prop()
    price: number;

    @prop()
    preferredDate: string;

    @prop()
    preferredTime: string;

    @prop()
    unattendedReason: number;

    @prop()
    description: string;

    @prop()
    name: string;

    @prop()
    emailId: string;

    @prop()
    streetLocality: string;

    @prop()
    houseNo: string;

    @prop()
    landMark: string;

    @prop()
    blockTower: string;

    @prop()
    serviceName: string;

    @prop()
    requestType: number;

    @prop()
    serviceFor: string | null;

    @prop()
    isReadOnce: boolean;

    @prop()
    createdBy: number;

    @prop()
    priority: string;

    @prop()
    delayReason: string;

    @prop()
    stageModifiedOn: Date;

    @prop()
    stageModifiedBy: string;

    @prop()
    isReferral: boolean;

    @prop()
    inProgressTime: Date;

    @prop()
    isInProgress: boolean;

    @prop()
    serviceCardImage: string;

    @prop()
    houseAddressImage: string;

    @prop()
    meterImage: string;

    @prop()
    applianceImage: string;

    @prop()
    feedbackImage: string;

    @prop()
    pressureGuageMake: string;

    @prop()
    pressureGuageMakeNo: string;

    @prop()
    gaugeCalibrationValidityFromDate: Date;

    @prop()
    gaugeCalibrationValidityFromTo: Date;

    @prop()
    holdingTime: Time;

    @prop()
    isModify: number;
}