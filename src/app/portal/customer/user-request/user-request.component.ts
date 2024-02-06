import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddCustomerService } from '../add-customer/add-customer.service';
@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {

  @Input() requestForm: FormGroup;
  constructor(readonly service: AddCustomerService) { }

  Zone : any = [];
  Role : any = [];
  GovtIdCardFile : File;
  AppointmentLetterFile : File;
  status : any = [{Id : 1 , displayText : 'Active'},{Id : 0, displayText : 'InActive'}]
  ngOnInit(): void {
    // this.service.GetAllActiveZone().subscribe((data:any)=>{
    //    this.Zone = data.data; 
    // });
    this.service.getAllActiveZoneCityCountry().subscribe((data:any)=>{
      this.Zone = data.data.data.allActiveZone;     
   });
   this.service.getAllAppRole().subscribe((data:any)=>{
    this.Role = data.data;     
 })
  }
  onFileSelected(event: any,FileName:any){
  //   this.GovtIdCardFile = event.target.files[0];
  //  // 
  //   this.requestForm.patchValue({ GovtIdCardFile: base64String});
  //   this.requestForm.patchValue({ ImageName:  this.imgName});

    const files: FileList = event.target.files; 
    
    if (files.length > 0) {
      const file = files[0]; 
      const extension = file.name.split('.').pop();
      let imgName = `${FileName}.${extension}`; 
      console.log(imgName);
      
      const reader :any = new FileReader();
      reader.onload = () => {
         const base64String = reader.result.toString().split(',')[1];
         //console.log(base64String);
         if(FileName == 'GovtIdCard'){
          this.requestForm.controls.request.get('GovtIdCardFile')?.setValue(base64String);
          this.requestForm.controls.request.get('GovtIdCardFileName')?.setValue(imgName);
         }
         if(FileName == 'AppointmentLetter'){
          this.requestForm.controls.request.get('AppointmentLetterFile')?.setValue(base64String);
          this.requestForm.controls.request.get('AppointmentLetterFileName')?.setValue(imgName);
         }if(FileName == 'JoiningForm'){
          this.requestForm.controls.request.get('JoiningFormFile')?.setValue(base64String);
          this.requestForm.controls.request.get('JoiningFormFileName')?.setValue(imgName);
         }
      };
      reader.readAsDataURL(file);
    }
  }
  onFileSelected1(event: any){
    this.AppointmentLetterFile = event.target.files[0];
    this.requestForm.controls.request.get('AppointmentLetterFile')?.setValue(this.AppointmentLetterFile)

  }
  public get RequestDetail() {
    return this.requestForm.controls.request as FormGroup;
  }

}
