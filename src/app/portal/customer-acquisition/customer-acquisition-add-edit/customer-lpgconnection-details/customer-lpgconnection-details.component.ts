

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { CustomerLPGConnectionDetailsService } from './customer-lpgconnection-details.service';

@Component({
  selector: 'app-customer-lpgconnection-details',
  templateUrl: './customer-lpgconnection-details.component.html',
  styleUrls: ['./customer-lpgconnection-details.component.scss']
})
export class CustomerLPGConnectionDetailsComponent implements OnInit {
  
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  @Input() lookups: any;

  serviceNames: Array<any>;
  LPGConnection: Array<any>;
  LPGConnectionName: Array<any>;

  constructor(readonly service: CustomerLPGConnectionDetailsService) { }

  ngOnInit(): void {
    this.bindDropdowns();
    // console.log(this.requestForm.controls.enquiryCallDetailList?.value);
  }

  
  bindDropdowns() {
    // console.log(this.lookups);
    this.serviceNames = this.lookups[this.service.constants.MasterCategories.ServiceMaster];
    this.LPGConnection = this.lookups[this.service.constants.MasterCategories.YesNo];
    this.LPGConnectionName = this.lookups[this.service.constants.MasterCategories.LPGConnectionName];
    
  }
  public get RequestDetail() {
    return this.requestForm.controls.request as FormGroup;
  }

}