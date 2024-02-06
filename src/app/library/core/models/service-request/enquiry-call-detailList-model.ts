import { prop } from "@rxweb/reactive-form-validators";

export class EnquiryCallDetailList{
    constructor(etl?: EnquiryCallDetailList) {
        
        if (etl) {
            this.agentID = etl.agentID;
            this.agentUserID = etl.agentUserID;            
            this.callDuration = etl.callDuration;
            this.callTime = etl.callTime;
            this.callType = etl.callType;
            this.createdBy = etl.createdBy;
            this.createdName = etl.createdName;
            this.createdOn = etl.createdOn;
            this.enquiryCallDetailID = etl.enquiryCallDetailID;
            this.enquiryID = etl.enquiryID;
            this.isdownloaded = etl.isdownloaded;
            this.phoneNo = etl.phoneNo;
            this.recordingFileName = etl.recordingFileName;
            this.recordingFileTempName = etl.recordingFileTempName;
            this.recordingFileURL = etl.recordingFileURL;
            this.status = etl.status;
            this.description = etl.description;
            

        }
        this.isDeleted = false;
    }

    @prop()
    callTime: string;
    @prop()
    agentID: number;
    @prop()
    callType: string;
    @prop()
    phoneNo: number;
    @prop()
    callDuration: string;
    @prop()
    recordingFileURL: string;
    @prop()
    createdOn: string;
    @prop()
    agentUserID: number;
    @prop()
    createdBy: number;
    @prop()
    createdName: string;
    @prop()
    enquiryID: string;
    @prop()
    enquiryCallDetailID: string;
    @prop()
    isdownloaded: string;
    @prop()
    recordingFileName: string;
    @prop()
    recordingFileTempName: string;
    
    @prop()
    status: string;
    @prop()
    description: string;

    
    @prop()
    isDeleted: boolean;
}