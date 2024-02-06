import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { OrderReportServiceService } from '../../../order-report/order-report-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sell-customer-detail',
  templateUrl: './sell-customer-detail.component.html',
  styleUrls: ['./sell-customer-detail.component.scss']
})
export class SellCustomerDetailComponent implements OnInit {
  @Input() requestForm: FormGroup;
  @Input() lookups: any;
  WorkTypeMaster: Array<any>;
  ClietMaster: Array<any>;
  SizeMaster: Array<any>;
  ProductMaster: Array<any>;
  DesignMaster: Array<any>;
  StatusMaster: Array<any>;
  HSN_CodeMaster: Array<any>;
  selectedWorkType : number = 1;
  MeasurementMaster : Array<any>;
  requestId : number;
  constructor(readonly service: OrderReportServiceService,private router: Router,readonly route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.bindDropdowns();
  }

  bindDropdowns() {

  }
  public get RequestDetail() {
    return this.requestForm.controls.request as FormGroup;
  }
  ChangeWorkTypeMaster(event:any){
   console.log(event);
   this.selectedWorkType = event;
  }
}
