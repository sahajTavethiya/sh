import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AssignedManpowerList } from 'src/app/library/core/models/service-request/assigned-manpowerList-model';
import { ManpowerService } from '../manpower.service';

@Component({
  selector: 'app-assigned-manpower',
  templateUrl: './assigned-manpower.component.html',
  styleUrls: ['./assigned-manpower.component.scss']
})
export class AssignedManpowerComponent implements OnInit {
  manpowerTaskTimeForm: FormGroup;

  @Input() requestForm: FormGroup;
  serviceSubCategories: Array<any>;
  filteredSubCategories: Array<any>;
  getSRAvailableManpower: Array<any>;
  getSRAvailableManpowerSelect: Array<any>;
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: ManpowerService,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: number ,getSRAvailableManpower:any},
    public dialogRef: MatDialogRef<AssignedManpowerComponent>) {
      this.getSRAvailableManpowerSelect=[];
     }

  ngOnInit(): void {
    this.bindDropdowns();
    this.initialize();

  }

  bindDropdowns() {
    this.getSRAvailableManpower = this.data.getSRAvailableManpower;
    
    
  }

  initialize() {
    const assignedManpowerList = new AssignedManpowerList();
    this.manpowerTaskTimeForm = this.formBuilder.formGroup(assignedManpowerList);
  }
  
  onChkChildChange(ob: MatCheckboxChange,index: any){
    console.log(ob.checked);
    console.log(index);
    // console.log(this.data.getSRAvailableManpower);
    

    if(ob.checked == true){
      this.getSRAvailableManpowerSelect.push(this.getSRAvailableManpower.filter(x => x.employeeCode == index)[0])
    }else{
      this.getSRAvailableManpowerSelect.forEach((value,ind)=>{
        console.log(value[0].employeeCode);
        if(value[0].employeeCode == index){
          this.getSRAvailableManpowerSelect.splice(ind,1);
        } 
      });
    }
    
    console.log(this.getSRAvailableManpowerSelect);
  }

  

  addAssignedManpower() {
    if (this.manpowerTaskTimeForm.valid) {
      this.dialogRef.close(this.getSRAvailableManpowerSelect);
    } else {
      this.manpowerTaskTimeForm.markAllAsTouched();
      this.service.notify.showDefaultError();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  workload(totalassignment:any)
  {
    if(totalassignment<=2)
    return "btn btn-success btn-xs";
    else if(totalassignment>2 && totalassignment<=4)
    return "btn btn-warning btn-xs";
    if(totalassignment>4)
    return "btn btn-danger btn-xs";
    return "btn btn-success btn-xs";
  }
}
