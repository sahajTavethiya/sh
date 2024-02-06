import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderReportServiceService } from '../../order-report-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-basic-detail-of-order',
  templateUrl: './basic-detail-of-order.component.html',
  styleUrls: ['./basic-detail-of-order.component.scss']
})
export class BasicDetailOfOrderComponent implements OnInit {
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
    // const categories = [
    //   this.service.constants.MasterCategories.RoleMaster,
    //   this.service.constants.MasterCategories.ClientMaster,
    //   this.service.constants.MasterCategories.WorkTypeMaster,
    //   this.service.constants.MasterCategories.ProductMaster,
    //   this.service.constants.MasterCategories.SizeMaster,
    //   this.service.constants.MasterCategories.DesignMaster,
    //   this.service.constants.MasterCategories.StatusMaster,


    // ];
    setTimeout(() => {
      this.WorkTypeMaster = this.lookups[this.service.constants.MasterCategories.WorkTypeMaster];
      this.ClietMaster = this.lookups[this.service.constants.MasterCategories.ClientMaster];
      this.ProductMaster = this.lookups[this.service.constants.MasterCategories.ProductMaster];
      this.SizeMaster = this.lookups[this.service.constants.MasterCategories.SizeMaster];
      this.DesignMaster = this.lookups[this.service.constants.MasterCategories.DesignMaster];
      this.StatusMaster = this.lookups[this.service.constants.MasterCategories.StatusMaster];
      this.HSN_CodeMaster = this.lookups[this.service.constants.OrderReportCategories.HSN_Master];
      this.MeasurementMaster = this.lookups[this.service.constants.OrderReportCategories.MeasurementCategory];

    }, 1000);
    this.requestId = this.route.snapshot.params.id;

    if(this.requestId && this.requestForm){
      console.log( "this is request form123",this.requestForm)
      this.selectedWorkType = this.requestForm.get('WorkTypeId')?.value;
      console.log("its selectedWorkType",this.selectedWorkType);
    this.ChangeWorkTypeMaster( this.requestForm.get('WorkTypeId')?.value)
    
    }
  }
  public get RequestDetail() {
    return this.requestForm as FormGroup;
  }
  ChangeWorkTypeMaster(event:any){
   console.log(event);
   this.selectedWorkType = event;
  }
}
