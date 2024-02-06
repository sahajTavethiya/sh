import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUserRequestContainer } from 'src/app/library/core/models/user/add-user-request-container.model';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AddCustomerService } from './add-customer.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  constructor( readonly formBuilder: RxFormBuilder,readonly dialog: MatDialog,readonly service: AddCustomerService) { }

  requestForm: FormGroup;
  ngOnInit(): void {
    const requestContainer = new AddUserRequestContainer();
    this.requestForm = this.formBuilder.formGroup(requestContainer);
    console.log(this.requestForm);
  }
  onSave(){
    let IsValide = false;
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("this is a conctractor Employee", container.ContractorEmployee)
      if(IsValide == false){
      
      if(container.request.Password != container.request.ConfirmPassword){
        return this.service.notify.showSuccess('password & confirm password are not same');
      }
      if(container.request.firstName == null || container.request.firstName == ''){
        return this.service.notify.showSuccess('Employee Name is required property');
      }
      if(container.request.fatherName == null || container.request.fatherName == ''){
        return this.service.notify.showSuccess('Father Name is required property');
      }
      if(container.request.AadhaarNo == null || container.request.AadhaarNo == ''){
        return this.service.notify.showSuccess('Aadhaar No is required property');
      }
      if(container.request.Password == null || container.request.Password == ''){
        return this.service.notify.showSuccess('Password is required property');
      }
      if(container.request.ConfirmPassword == null || container.request.ConfirmPassword == ''){
        return this.service.notify.showSuccess('ConfirmPassword is required property');
      }
      if(container.request.IsActive == null || container.request.IsActive == ''){
        return this.service.notify.showSuccess('Status is required property');
      }
      if(container.request.zoneId == null || container.request.zoneId == 0){
        return this.service.notify.showSuccess('Zone is required property');
      }
      if(container.request.GovtIdCardFile == null || container.request.GovtIdCardFile == ''){
        return this.service.notify.showSuccess('GovtIdCardFile is required property');
      }
      if(container.request.Mobile == null || container.request.Mobile == ''){
        return this.service.notify.showSuccess('Mobile is required property');
      }      
      if(container.request.EmailId == null || container.request.EmailId == ''){
        return this.service.notify.showSuccess('EmailId is required property');
      }
      IsValide = true;
    };
    if(IsValide == true){

   
      let EmployeeObj = {
        FirstName : container.request.firstName,
        FatherName : container.request.fatherName,
        EmailId : container.request.EmailId,
        Password : container.request.password,
        Mobile : container.request.Mobile,
        ContactNo : container.request.ContactNo || null,
        HouseNo : container.request.HouseNo || null,
        StreetLocatlity : container.request.StreetLocatlity || null,
        BlockTower: container.request.BlockTower || null,
        PinCode : container.request.PinCode,
        CityId : container.request.CityId,
        StateId : container.request.StateId,
        CountryId : container.request.CountryId,
        GovtIdCardFilePath : null,
        AadhaarNo : container.request.AadhaarNo,
        PanNo : container.request.PanNo,
        AppointmentLetterFilePath : container.request.AppointmentLetterFilePath || null,
        Qualification : container.request.Qualification ||  null,
        YearsOfExperience : container.request.YearsOfExperience,
        PFCode : container.request.PFCode,
        ESICode : container.request.ESICode,
        worklocations : container.request.worklocations,
        UserTypeId : container.request.UserTypeId || 2,
        Remark : container.request.Remark || null,
        JoiningFormFilePath : container.request.JoiningFormFilePath || null,
        RoleID : container.request.RoleID,
        UserName : container.request.EmailId,
        ContratorEmployeeTable : [{
          Name : container.ContractorEmployee.Name,
          AadhaarNo : container.ContractorEmployee.AadhaaNo,
          EmailId : container.ContractorEmployee.EmailId,
          phone : container.ContractorEmployee.Phone
        }],
        BankName : container.request.BankName,
        Address : container.request.Address,
        Branch : container.request.Branch,
        AccountNO : container.request.AccountNO,
        NEFT_RTGS_Code : container.request.NEFT_RTGS_Code 
      }
      console.log("Employee",EmployeeObj);
      //this.saveFile(1589,container.request.GovtIdCardFileName,container.request.GovtIdCardFile)
      // console.log("this is a file",container.request.GovtIdCardFile);
      // console.log("this is a file",container.request.GovtIdCardFileName);
        this.service.saveManpower(EmployeeObj).subscribe((data:any)=>{
          
          if(data.data[0].userId != null || data[0].userId != 0){
            let UserId =   data.data[0].userId;// 1468;
            let  JoiningFormFilePath,GovtIdCardFilePath,AppointmentLetterFilePath,ScannedchequeFilePath ;

            if(container.request.JoiningFormFile != null &&  container.request.JoiningFormFileName != null){
              JoiningFormFilePath  = this.saveFile( UserId,container.request.JoiningFormFileName,container.request.JoiningFormFile);
            }
            if(container.request.GovtIdCardFile != null &&  container.request.GovtIdCardFileName != null){
              GovtIdCardFilePath  = this.saveFile(UserId,container.request.GovtIdCardFileName,container.request.GovtIdCardFile);
            }
            if(container.request.AppointmentLetterFile != null && container.request.AppointmentLetterFileName != null){
              AppointmentLetterFilePath  = this.saveFile(UserId,container.request.AppointmentLetterFileName,container.request.AppointmentLetterFile);
            }
            if(container.request.ScannedchequeFile != null && container.request.ScannedchequeFileName != null ){
              ScannedchequeFilePath  = this.saveFile(UserId,container.request.ScannedchequeFileName,container.request.ScannedchequeFile);
            }
            setTimeout(() => {
              let obj = {
                ScannedchequeFilePath : this.ScannedchequePath,
                GovtIdCardFilePath : this.GovtIdCardPath,
                AppointmentLetterFilePath :this.AppointmentLetterPath,
                JoiningFormFile :this.JoiningFormPath,
                UserId : UserId
              }
  
              this.service.UpdateAppUserDocumentPath(obj).subscribe((responce:any)=>{
                console.log("saveFilePath",responce);
              })
            },600)

          }    
               
        })
      }
    }
  }
  base64String : any;
  GovtIdCardPath : string = '';
  AppointmentLetterPath : string = '';
  JoiningFormPath : string ='';
  ScannedchequePath : string = '';
  saveFile(UserId:number,imgName:string,imageData:string){
    let obj = {
      UserId:UserId,
      ImageData:imageData,
      ImageName:`${UserId}_${imgName}`,
      UploadedOn: new Date()
    }
    let splitName =  imgName.split(".");
    let name =  splitName[splitName.length - 2];
    this.service.UploadFileOfEmployee(obj).subscribe((responce:any)=>{
      console.log(responce)
      const filePath = responce.data;
      const parts = filePath.split("\\");
      let lastSTR = parts[ parts.length - 1];
      let lasrOneSTR = parts[ parts.length - 2];
      if(name == 'GovtIdCard'){
        this.GovtIdCardPath =  `/${lasrOneSTR}//${lastSTR}`;
      }if(name == 'AppointmentLetter'){
        this.AppointmentLetterPath =  `/${lasrOneSTR}//${lastSTR}`;
      }if(name == 'JoiningForm'){
        this.JoiningFormPath =  `/${lasrOneSTR}//${lastSTR}`;
      }if(name == 'Scannedcheque'){
        this.ScannedchequePath =  `/${lasrOneSTR}//${lastSTR}`;
      }
      
    });
  }
  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to cancel your changes?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

}
