import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-basic-detail-of-user',
  templateUrl: './basic-detail-of-user.component.html',
  styleUrls: ['./basic-detail-of-user.component.scss']
})
export class BasicDetailOfUserComponent implements OnInit {

  @Input() requestForm: FormGroup;
  @Input() lookups : any;
  WorkTypeArray : Array<any>;
  ClietMaster : Array<any>;
  SizeMaster : Array<any>;
  ProductMaster : Array<any>;
  DesignMaster : Array<any>;
  StatusMaster : Array<any>;
  RoleMaster : Array<any>;
  ActiveMaster : Array<any>;
  constructor(readonly service: UserService,) { }

  ngOnInit(): void {
    this.requestForm.get('BirthDate')?.setValue(this.requestForm.get('BirthDate')?.value != null ? this.service.Moment(this.requestForm.get('BirthDate')?.value).format("YYYY-MM-DD") : null)


      this.bindDropdowns();
  }

  bindDropdowns() {
    // const categories = [
    //   this.service.constants.MasterCategories.RoleMaster,
    //   this.service.constants.MasterCategories.ClientMaster,
    //   this.service.constants.MasterCategories.WorkTypeMaster,
    //   this.service.constants.MasterCategories.ProductMaster,
    //   this.service.constants.MasterCategories.SizeMaster,
    //   this.service.constants.MasterCategories.DesignMaster,
    //   this.service.constants.MasterCategories.StatusMaster,


    // ];
   //   this.WorkTypeArray = this.lookups[this.service.constants.MasterCategories.WorkTypeMaster];
    //  this.ClietMaster = this.lookups[this.service.constants.MasterCategories.ClientMaster];
     // this.ProductMaster = this.lookups[this.service.constants.MasterCategories.ProductMaster];
     // this.SizeMaster = this.lookups[this.service.constants.MasterCategories.SizeMaster];
     // this.DesignMaster = this.lookups[this.service.constants.MasterCategories.DesignMaster];
     // this.StatusMaster = this.lookups[this.service.constants.MasterCategories.StatusMaster];
      this.RoleMaster = this.lookups[this.service.constants.MasterCategories.RoleMaster];
      this.ActiveMaster = this.lookups[this.service.constants.MasterCategories.ActiveMaster];
  }
  public get RequestDetail() {
    return this.requestForm as FormGroup;
  }

}
