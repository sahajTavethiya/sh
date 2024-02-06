import { prop } from "@rxweb/reactive-form-validators";

export class DailyWorkBasicDetail {
    constructor(etl?: DailyWorkBasicDetail) {
        if (etl) {
            this.tblId = etl.tblId;
            this.assignTaskMasterId = etl.assignTaskMasterId;
            this.userId = etl.userId;
            this.completePiece = etl.completePiece;
            this.workRatePerPiece = etl.workRatePerPiece;
            this.completedByEmployee = etl.completedByEmployee;
            this.note = etl.note;
            this.employeeName = etl.employeeName;
            this.createdOn = etl.createdOn;
            this.noOfPiece = etl.noOfPiece;
            this.isDelete = etl.isDelete;
        }
    }
    @prop()
    tblId:number;
    @prop()
    assignTaskMasterId:number;
    @prop()
    userId: number;
    @prop()
    completePiece: number;
    @prop()
    workRatePerPiece: Date;
    @prop()
    completedByEmployee: boolean; // 0 or 1
    @prop()
    note : string
    @prop()
    employeeName : string
    @prop()
    createdOn : Date;
    @prop()
    noOfPiece : number
    @prop()
    isDelete : number;
}