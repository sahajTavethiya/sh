import { prop } from "@rxweb/reactive-form-validators";

export class BasicDetailOfUser {
    constructor(etl?: BasicDetailOfUser) {
        
        if (etl) {
            this.UserId = etl.UserId
            this.Name = etl.Name;
            this.EmailId = etl.EmailId;
            this.Mobile = etl.Mobile;
            this.Password = etl.Password; 
            this.RoleId = etl.RoleId;
            // this.Role = etl.Role;
            this.BirthDate = etl.BirthDate;
            this.IsActive = etl.IsActive;
        }
    }
    @prop()
    Name: string;
    @prop()
    UserId: number;
    @prop()
    EmailId: string;
    @prop()
    Mobile: string;
    @prop()
    Password : string;
    @prop()
    RoleId : string;
    // @prop()
    // Role : string;
    @prop()
    BirthDate : Date;
    @prop()
    IsActive : number;
}