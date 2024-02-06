import { prop } from "@rxweb/reactive-form-validators";

export class AssignedManpower{
    constructor(etl?: AssignedManpower) {
        
        if (etl) {
        this.createdBy = etl.createdBy;
        this.createdName = etl.createdName;
        this.createdOn = etl.createdOn;
        this.employeeId = etl.employeeId;
        this.employeeName = etl.employeeName;
        this.endTime = etl.endTime;
        this.enquiryId = etl.enquiryId;
        this.id = etl.id;
        this.modifiedBy = etl.modifiedBy;
        this.modifiedName = etl.modifiedName;
        this.modifiedOn = etl.modifiedOn;
        this.rowStatus = etl.rowStatus;
        this.startTime = etl.startTime;
        this.status = etl.status;
        this.mobileNo = etl.mobileNo;

        }
        this.isDeleted = false;
    }

    @prop()
    createdName: string;
    @prop()
    createdBy: number;
    @prop()
    createdOn: string;
    @prop()
    employeeId: number;
    @prop()
    employeeName: string;
    @prop()
    endTime: string;
    @prop()
    enquiryId: string;
    @prop()
    id: number;
    @prop()
    mobileNo: string;
    @prop()
    modifiedName: boolean;
    @prop()
    startTime: string;
    @prop()
    modifiedBy: string;
    @prop()
    modifiedOn: string;
    @prop()
    rowStatus: string;
    @prop()
    status: string;
    @prop()
    isDeleted: boolean;
}