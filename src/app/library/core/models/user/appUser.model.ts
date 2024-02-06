import { A } from "@angular/cdk/keycodes";
import { prop, propArray, propObject } from "@rxweb/reactive-form-validators";
export class AppUser {
    constructor(user?: AppUser) {
        if (user) {
            this.id = user.id;
            this.firstName = user.firstName;
            this.fatherName = user.fatherName;
            this.PFCode = user.PFCode;
            this.ESICode = user.ESICode;
            this.Password = user.Password;
            this.Mobile = user.Mobile;
            this.AadhaarNo = user.AadhaarNo;
            this.PanNo = user.PanNo;
            this.Qualification = user.Qualification;
            this.worklocations = user.worklocations;
            this.YearsOfExperience = user.YearsOfExperience;
            this.Remark = user.Remark;
            this.GovtIdCardFile = user.GovtIdCardFile;
            this.AppointmentLetterFile = user.AppointmentLetterFile;
            this.JoiningFormFile = user.JoiningFormFile;

            // this.roleID = user.roleID;
            // this.emailId = user.emailId;
            // this.username = user.username;
            // this.isActive = user.isActive;
            // this.createdOn = user.createdOn;
            // this.cityId = user.cityId;
            // this.mobile = user.mobile;
            // this.manpowerId = user.manpowerId;
            // this.provider = user.provider;
            // this.providerId = user.providerId;
            // this.companyMasterId = user.companyMasterId;
            // this.createdBy = user.createdBy;
            // this.userTypeId = user.userTypeId;
            // this.token = user.token;
        }
    }
    @prop()
    id: number;
    @prop()
    firstName: string;
    @prop()
    fatherName: string;
    @prop()
    PFCode: string;
    @prop()
    ESICode: string;
    @prop()
    Password: string;
    @prop()
    ConfirmPassword: string;
    @prop()
    Mobile : string;
    @prop()
    AadhaarNo : string;
    @prop()
    PanNo : string;
    @prop()
    Qualification : string;
    @prop()
    worklocations : string;
    @prop()
    YearsOfExperience : number;
    @prop()
    Remark : string;
    @prop()
    GovtIdCardFile : File;
    @prop()
    GovtIdCardFileName : File;
    @prop()
    AppointmentLetterFile : File;
    @prop()
    AppointmentLetterFileName : string;
    @prop()
    JoiningFormFile : File;
    @prop()
    JoiningFormFileName : string
    @prop()
    EmailId : string;
    @prop()
    HouseNo : string;
    @prop()
    StreetLocatlity : string;
    @prop()
    BlockTower : string;
    @prop()
    PinCode : string;
    @prop()
    CityId : Number;
    @prop()
    StateId : Number;
    @prop()
    CountryId : Number;
    @prop() 
    BankName : string;
    @prop()
    Branch : string;
    @prop()
    NEFT_RTGS_Code : string;
    @prop()
    Address : string;
    @prop()
    AccountNO : string;
    @prop()
    ScannedchequeFile : string;
    @prop()
    zoneId : number;
    @prop()
    ContactNo : string;
    @prop()
    RoleID: number;
    @prop()
    IsActive: number;
    @prop()
    ContratorEmployeeTable : [];
    // emailId: string;
    // username: string;
    // isActive: string;
    // createdOn: Date;
    // cityId: string;
    // mobile: string;
    // manpowerId: number;
    // provider: string;
    // providerId: string;
    // companyMasterId: number;
    // createdBy: number;
    // userTypeId: number;
    // token: string;
}