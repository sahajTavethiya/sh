import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { RequestDetailService } from '../../request/request-detail/request-detail.service';
import { RequestService } from '../../request/request.service';
import { SRDashboardService } from '../srdashboard.service';

@Component({
  selector: 'app-assign-manpower-bulk',
  templateUrl: './assign-manpower-bulk.component.html',
  styleUrls: ['./assign-manpower-bulk.component.scss']
})
export class AssignManpowerBulkComponent implements OnInit {
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  
  getSRAvailableManpower: Array<any>;
  getSRAvailableManpowerSelec :any;
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service1: SRDashboardService,
    readonly service2: RequestService,
    readonly service: RequestDetailService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { enquiryData: Array<any> ,type: any},
    public dialogRef: MatDialogRef<AssignManpowerBulkComponent>) { }

  ngOnInit(): void {
    const data ={
      "serviceIds": [this.data.enquiryData[0].serviceId],
      "zones": [this.data.enquiryData[0].cityId],
    }
    
  
  this.service1.GetManpowerForBulkAssigned(data).subscribe((response: any) => {
    if (response.status == 'success') {
      this.getSRAvailableManpower = response.data.result
      
    }
  });

    
  }

  
  onChkChildChange(ob: MatCheckboxChange,index: any){
    console.log(ob.checked);
    console.log(index);
    // console.log(this.data.getSRAvailableManpower);
    this.getSRAvailableManpower.forEach(element => {
      element.isSelect = false;
    });
    
    if(ob.checked == true){
      this.getSRAvailableManpowerSelec= this.getSRAvailableManpower.filter(x => x.employeeCode == index)[0];

      this.getSRAvailableManpower.forEach(element => {
        if(element.employeeCode ==  this.getSRAvailableManpowerSelec.employeeCode) {
          element.isSelect = true;
        }
        
      });
    }else{
      this.getSRAvailableManpowerSelec='';
    }
    console.log(this.getSRAvailableManpowerSelec);
    
  }

  addAssignedManpower() {

    console.log(this.data.enquiryData);
    console.log(this.getSRAvailableManpowerSelec);
    if(this.getSRAvailableManpowerSelec){
      let srNumbers : any = []

      this.data.enquiryData.forEach(element => {
        srNumbers.push(element.enquiryId);
        
      });
      
      const data ={
        "srNumbers": srNumbers,
        "manpowerId": this.getSRAvailableManpowerSelec.employeeID,
      }
      
    
    this.service1.SaveManpowerForBulkAssigned(data).subscribe((response: any) => {
      if (response.status == 'success') {
        this.service.notify.showError('Manpower Assigned Successfully');
        this.cancel()
      }else{
        response.errors.forEach((keys: any, vals: any) => {
          console.log(keys.errorMessage);
          this.service.notify.showSuccess(keys.errorMessage);
        });
      }
    });

    }else{
      this.service.notify.showError('Please select Assigned Manpower');
    }
    
  }

 

  cancel() {
    this.dialogRef.close();
  }
}
