import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { PaymentDetailsService } from './payment-details.service';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  @Input() lookups: any;

  serviceNames: Array<any>;
  PaymentMethodArr: Array<any>; 

  constructor(readonly service: PaymentDetailsService) { }

  ngOnInit(): void {
    this.bindDropdowns();
    // console.log(this.requestForm.controls.enquiryCallDetailList?.value);
  }

  bindDropdowns() {
    // console.log(this.lookups);
    this.requestForm.controls.request.get('paymentDate')?.setValue(this.requestForm.controls.request.get('paymentDate')?.value != null ? this.service.Moment(this.requestForm.controls.request.get('paymentDate')?.value).format("YYYY-MM-DD") : null)
    this.requestForm.controls.request.get('drawnOn')?.setValue(this.requestForm.controls.request.get('drawnOn')?.value != null ? this.service.Moment(this.requestForm.controls.request.get('drawnOn')?.value).format("YYYY-MM-DD") : null)

    this.serviceNames = this.lookups[this.service.constants.MasterCategories.ServiceMaster];
    
    this.PaymentMethodArr = this.lookups[this.service.constants.MasterCategories.PaymentMethod];
  }

  public get CustomerAcquisitionDetail() {
    return this.requestForm.controls.request as FormGroup;
  }

}
