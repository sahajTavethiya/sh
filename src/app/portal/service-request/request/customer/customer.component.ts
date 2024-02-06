import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { CustomerService } from './customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  
  @Input() requestId: any;
  @Input() requestForm: FormGroup;


  constructor(readonly service: CustomerService) { }

  ngOnInit(): void {
    console.log(this.requestForm.controls.enquiryCallDetailList?.value);
  }

  

  public get RequestDetail() {
    return this.requestForm.controls.request as FormGroup;
  }

}

