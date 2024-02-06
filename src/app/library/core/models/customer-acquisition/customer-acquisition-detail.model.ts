import { formatDate, Time } from "@angular/common";
import { prop } from "@rxweb/reactive-form-validators";

export class CustomerAcquisitionDetail {
    constructor(req?: CustomerAcquisitionDetail) {
        if (req) {

            this.id = req.id;
            this.titleID = req.titleID ? req.titleID.toString() : null;
            this.customerName = req.customerName;
            this.mobile = req.mobile;
            this.fatherHusbandNameID = req.fatherHusbandNameID ? req.fatherHusbandNameID.toString() : null;
            this.fatherHusbandName = req.fatherHusbandName;
            this.houseNo = req.houseNo;
            this.floor = req.floor;
            this.streetAreaSociety = req.streetAreaSociety;
            this.stateID = req.stateID ? req.stateID.toString() : null;
            this.cityID = req.cityID ? req.cityID.toString() : null;
            this.zoneId = req.zoneId ? req.zoneId.toString() : null;
            this.pincode = req.pincode;
            this.aadhaarNo = req.aadhaarNo;
            this.contactNo = req.contactNo;
            this.typeOfOwnershipID = req.typeOfOwnershipID ? req.typeOfOwnershipID.toString() : null;
            this.emailID = req.emailID;
            this.photoIDFilename = req.photoIDFilename;
            this.addressProofFilename = req.addressProofFilename;
            this.registrationFilename1 = req.registrationFilename1;
            this.registrationFilename2 = req.registrationFilename2;
            this.employeeId = req.employeeId ? req.employeeId.toString() : null;
            this.isLPGConnection = req.isLPGConnection == null ?null : (req.isLPGConnection  ?'1':'2');
            this.lpgConnectionNameID = req.lpgConnectionNameID ? req.lpgConnectionNameID.toString() : null;
            this.lpgDistributor = req.lpgDistributor;
            this.lpgid = req.lpgid;
            this.consumerNo = req.consumerNo;
            this.paymentMethod = req.paymentMethod ? req.paymentMethod.toString() : null;
            this.orderDDChequeNo = req.orderDDChequeNo;
            this.paymentDate = req.paymentDate;
            this.drawnOn = req.drawnOn;
            this.amount = req.amount;
            this.photoIDFile = req.photoIDFile;
            this.addressProofFile = req.addressProofFile;
            this.registrationFile1 = req.registrationFile1;
            this.registrationFile2 = req.registrationFile2;
            
            this.photoIDFilenameOld = req.photoIDFilename;
            this.addressProofFilenameOld = req.addressProofFilename;
            this.registrationFilename1Old = req.registrationFilename1;
            this.registrationFilename2Old = req.registrationFilename2;
            this.customerID=req.customerID;
            this.formNo=req.formNo;
        }
    }
    @prop()
    photoIDFilenameOld: string;
    
    @prop()
    addressProofFilenameOld: string;
    
    @prop()
    registrationFilename1Old: string;
    
    @prop()
    registrationFilename2Old: string;

    @prop()
    photoIDFile: string;

    @prop()
    addressProofFile: string;
    
    @prop()
    registrationFile1: string;

    @prop()
    registrationFile2: string;

    @prop()
    id: number;

    @prop()
    titleID: string | null;
    
    @prop()
    customerName: string;

    @prop()
    mobile: string;

    @prop()
    fatherHusbandNameID: string | null;
    
    @prop()
    fatherHusbandName: string;

    @prop()
    houseNo: string;

    @prop()
    floor: string;

    @prop()
    streetAreaSociety: string;

    @prop()
    stateID: string | null;

    @prop()
    cityID: string | null;

    @prop()
    zoneId: string | null;

    @prop()
    pincode: string;

    @prop()
    aadhaarNo: string;

    @prop()
    contactNo: string;

    @prop()
    typeOfOwnershipID: string | null;

    @prop()
    emailID: string;
    
    @prop()
    photoIDFilename: string;
    
    @prop()
    addressProofFilename: string;
    
    @prop()
    registrationFilename1: string;
    
    @prop()
    registrationFilename2: string;
    
    @prop()
    isLPGConnection: string | null;
    
    @prop()
    lpgConnectionNameID: string | null;

    @prop()
    lpgDistributor: string;

    @prop()
    lpgid: string;

    @prop()
    consumerNo: string;
    
    @prop()
    paymentMethod: string | null;
    
    @prop()
    orderDDChequeNo: string | null;

    @prop()
    paymentDate: Date;
    
    @prop()
    drawnOn: Date;
    
    @prop()
    amount: number;
    @prop()
    entryBy: number;
    @prop()
    employeeId: string | null;
    @prop()
    status: number;
    @prop()
    customerID: string;
    @prop()
    formNo: string;
}