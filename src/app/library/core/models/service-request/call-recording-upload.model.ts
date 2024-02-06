import { prop } from "@rxweb/reactive-form-validators";

export class  CallRecordingUpload {
    constructor(etl?: CallRecordingUpload) {
        if (etl) {
            this.enquiryID = etl.enquiryID;
            this.agentID = etl.agentID;
            this.phoneNo = etl.phoneNo;
            this.status = etl.status;
            this.callType = etl.callType;
            this.callTime = etl.callTime;
            this.Duration = etl.Duration;
            this.recordingFile = etl.recordingFile;
        }
    }

    @prop()
    enquiryID: string;
    @prop()
    agentID: string;
    @prop()
    phoneNo: string;
    @prop()
    status: string;
    @prop()
    callType: string;
    @prop()
    callTime: string;
    @prop()
    Duration: string;
    @prop()
    recordingFile: string;
    
}