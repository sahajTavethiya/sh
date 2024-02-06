import { prop } from "@rxweb/reactive-form-validators";

export class AssignedManpowerList{
    constructor(etl?: AssignedManpowerList) {
        
        if (etl) {
            this.activeLocation =etl.activeLocation;
            this.createdBy =etl.createdBy;
            this.createdByName =etl.createdByName;
            this.createdOn =etl.createdOn;
            this.employeeId =etl.employeeId;
            this.employeeName =etl.employeeName;
            this.enquiryId =etl.enquiryId;
            this.id =etl.id;
            this.isActive =etl.isActive;
            this.manpowerLink =etl.manpowerLink;
            this.modifiedBy =etl.modifiedBy;
            this.modifiedOn =etl.modifiedOn;
            this.rowStatus =etl.rowStatus;
            this.status =etl.status;
            this.mobileNo =etl.mobileNo;
            this.companyName =etl.companyName;
            this.serviceName =etl.serviceName;
            this.totalAssignment =etl.totalAssignment;

        }
        this.isDeleted = false;
    }

    @prop()
    activeLocation: string;
    @prop()
    createdBy: string;
    @prop()
    createdOn: string;
    @prop()
    employeeId: number;
    @prop()
    employeeName: string;
    @prop()
    createdByName: string;
    @prop()
    enquiryId: string;
    @prop()
    id: number;
    @prop()
    isActive: boolean;
    @prop()
    manpowerLink: string;
    @prop()
    modifiedBy: string;
    @prop()
    modifiedOn: string;
    @prop()
    rowStatus: number;
    @prop()
    status: string;
    @prop()
    isDeleted: boolean;
    @prop()
    mobileNo: string;
    @prop()
    companyName: string;
    @prop()
    serviceName: string;
    @prop()
    totalAssignment: number;
}