

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { AcquisitionDetailService } from './acquisition-detail.service';

@Component({
  selector: 'app-acquisition-details',
  templateUrl: './acquisition-details.component.html',
  styleUrls: ['./acquisition-details.component.scss']
})
export class AcquisitionDetailsComponent implements OnInit {
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  @Input() lookups: any;
  RegistrationForm1Name: any;
  RegistrationForm1ToUpload: any;
  RegistrationForm1ToUploadarr: any;
  RegistrationForm2Name: any;
  RegistrationForm2ToUpload: any;
  RegistrationForm2ToUploadarr: any;
  PhotoIDName: any;
  PhotoIDToUpload: any;
  PhotoIDToUploadarr: any;
  AddressProofName: any;
  AddressProofToUpload: any;
  AddressProofToUploadarr: any;
  serviceNames: Array<any>;
  StateArr: Array<any>;
  CityArr: Array<any>; 
  ZoneMasterArr: Array<any>; 
  TitleArr: Array<any>; 
  CustomerNameTypeArr: Array<any>; 
  OwnershipType: Array<any>; 
  filteredCityArr: Array<any>;
  filteredZoneMasterArr: Array<any>;
  ManPowerArr: Array<any>;
  blob :any;
  replytype: any;

  constructor(readonly service: AcquisitionDetailService,readonly route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params.id;
    
    this.bindDropdowns();
    this.detectValueChanges();
    this.detectValueChanges1();
  }


  bindDropdowns() {
    // console.log(this.lookups);
    
    this.StateArr = this.lookups[this.service.constants.MasterCategories.StateMaster];
    this.CityArr = this.lookups[this.service.constants.MasterCategories.CityMaster];
    this.ZoneMasterArr = this.lookups[this.service.constants.MasterCategories.AllZoneMaster];
    this.serviceNames = this.lookups[this.service.constants.MasterCategories.ServiceMaster];
    this.TitleArr = this.lookups[this.service.constants.MasterCategories.CustomerTitle];
    this.CustomerNameTypeArr = this.lookups[this.service.constants.MasterCategories.CustomerNameType];
    this.OwnershipType = this.lookups[this.service.constants.MasterCategories.OwnershipType];

  }
  public get CustomerAcquisitionDetail() {
    return this.requestForm.controls.request as FormGroup;
  }
  detectValueChanges1() {

    if (this.requestForm.controls.request.get('stateID')?.value) {
      this.filteredCityArr = this.CityArr.filter(city => {
        return city.parent === this.requestForm.controls.request.get('stateID')?.value;
      });
    } else {
      this.requestForm.controls.request.get('cityID')?.setValue(null);
      this.filteredCityArr = new Array<any>();
    }

    if (this.requestForm.controls.request.get('cityID')?.value) {
      this.filteredZoneMasterArr = this.ZoneMasterArr.filter(zone => {
        return zone.parent === this.requestForm.controls.request.get('cityID')?.value;
      });
    } else {
      this.requestForm.controls.request.get('zoneId')?.setValue(null);
      this.filteredZoneMasterArr = new Array<any>();
    }

    if (this.requestForm.controls.request.get('zoneId')?.value) {
      let data ={
        userTypeId: 2,
        zoneId: this.requestForm.controls.request.get('zoneId')?.value        
      }
      
      this.service.GetEmployeeListByZoneIdAndTypeId(data).subscribe((response: any) => {
        // console.log(response);
        if (response.status == 'success') {
          this.ManPowerArr = response.data;
        } else {
          
        }
      });
    } else {
      this.requestForm.controls.request.get('employeeId')?.setValue(null);
      this.ManPowerArr = new Array<any>();
    }
    
  }
  detectValueChanges() {
    this.requestForm.controls.request.get('stateID')?.valueChanges.subscribe((category: any) => {
      // console.log(category);
      if (category) {
        this.requestForm.controls.request.get('cityID')?.setValue(null);
        this.filteredCityArr = this.CityArr.filter(city => {
          return city.parent === category;
        });
      } else {
        this.requestForm.controls.request.get('cityID')?.setValue(null);
        this.filteredCityArr = new Array<any>();
      }
    });

    this.requestForm.controls.request.get('cityID')?.valueChanges.subscribe((city: any) => {
      // console.log(this.ZoneMasterArr);
      if (city) {
        this.requestForm.controls.request.get('zoneId')?.setValue(null);
        this.filteredZoneMasterArr = this.ZoneMasterArr.filter(zone => {
          return zone.parent === city;
        });
      } else {
        this.requestForm.controls.request.get('zoneId')?.setValue(null);
        this.filteredZoneMasterArr = new Array<any>();
      }
    });

    this.requestForm.controls.request.get('zoneId')?.valueChanges.subscribe((zone: any) => {
      // console.log(this.ZoneMasterArr);
      if (zone) {
        let data ={
          userTypeId: 2,
          zoneId: zone        
        }
        
        this.service.GetEmployeeListByZoneIdAndTypeId(data).subscribe((response: any) => {
          // console.log(response);
          if (response.status == 'success') {
            this.ManPowerArr = response.data;
          } else {
            
          }
        });
      } else {
        this.requestForm.controls.request.get('employeeId')?.setValue(null);
        this.ManPowerArr = new Array<any>();
      }
    });

  }
  
  RegistrationForm1FileInput(event: any) {
    
    if(event.target.files[0]){
      this.RegistrationForm1Name = event.target.files[0].name;
      this.requestForm.controls.request.get('registrationFilename1')?.setValue(event.target.files[0].name);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.RegistrationForm1ToUpload = reader.result;
          this.RegistrationForm1ToUploadarr = this.RegistrationForm1ToUpload.split(',')
          this.requestForm.controls.request.get('registrationFile1')?.setValue(this.RegistrationForm1ToUploadarr[1]);
      // console.log(this.RegistrationForm1ToUploadarr);
      };
      
    }else{
      this.RegistrationForm1ToUploadarr = [];
      this.RegistrationForm1ToUpload = '';
      this.requestForm.controls.request.get('registrationFile1')?.setValue(null);
      
      this.requestForm.controls.request.get('registrationFilename1')?.setValue(null);
    }
    
  }

  RegistrationForm2FileInput(event: any) {
    // console.log(event.target.files[0]);
    if(event.target.files[0]){
      this.RegistrationForm2Name = event.target.files[0].name;
      this.requestForm.controls.request.get('registrationFilename2')?.setValue(event.target.files[0].name);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.RegistrationForm2ToUpload = reader.result;
          this.RegistrationForm2ToUploadarr = this.RegistrationForm2ToUpload.split(',')
      this.requestForm.controls.request.get('registrationFile2')?.setValue(this.RegistrationForm2ToUploadarr[1]);

      };
      
    }else{
      this.RegistrationForm2ToUploadarr = [];
      this.RegistrationForm2ToUpload = '';
      
      this.requestForm.controls.request.get('registrationFilename3')?.setValue(null);
      this.requestForm.controls.request.get('registrationFile2')?.setValue(null);

    }
    
  }
  PhotoIDFileInput(event: any) {
    // console.log(event.target.files[0]);
    if(event.target.files[0]){
      this.PhotoIDName = event.target.files[0].name;
      this.requestForm.controls.request.get('photoIDFilename')?.setValue(event.target.files[0].name);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.PhotoIDToUpload = reader.result;
          this.PhotoIDToUploadarr = this.PhotoIDToUpload.split(',')
        this.requestForm.controls.request.get('photoIDFile')?.setValue(this.PhotoIDToUploadarr[1]);

      };
      
    }else{
      this.PhotoIDToUploadarr = [];
      this.PhotoIDToUpload = '';
      
      this.requestForm.controls.request.get('photoIDFilename')?.setValue(null);
      this.requestForm.controls.request.get('photoIDFile')?.setValue(null);

    }
    
  }

  AddressProofFileInput(event: any) {
    // console.log(event.target.files[0]);
    if(event.target.files[0]){
      this.AddressProofName = event.target.files[0].name;
      this.requestForm.controls.request.get('addressProofFilename')?.setValue(event.target.files[0].name);

      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.AddressProofToUpload = reader.result;
          this.AddressProofToUploadarr = this.AddressProofToUpload.split(',')
      this.requestForm.controls.request.get('addressProofFile')?.setValue(this.AddressProofToUploadarr[1]);

      };
      
    }else{
      this.AddressProofToUploadarr = [];
      this.AddressProofToUpload = '';
      this.requestForm.controls.request.get('addressProofFilename')?.setValue(null);
      this.requestForm.controls.request.get('addressProofFile')?.setValue(null);


    }
    
  }

  viewCustomerDocuments(name:any){

    this.service.CustomerDocuments(this.requestId,name).subscribe((data:any) => {
      
      console.log(data);
      this.blob = new Blob([data], {type: 'application/jpg'});
    
      var downloadURL = window.URL.createObjectURL(this.blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download =name;
      link.click();
    
    },
    (error) => {
      this.service.notify.showError('File Not Found');
      // console.log(error);
    });
  }

}
