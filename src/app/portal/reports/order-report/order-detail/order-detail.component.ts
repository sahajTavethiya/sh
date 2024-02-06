import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderReportServiceService } from '../order-report-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { AddOrderBasicDetail } from 'src/app/library/core/models/add-order-basic-detail.model';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  requestForm: FormGroup;
  addForm: FormGroup;
  requestId: number;
  OrderReportDetailLookups: any;
  constructor(readonly service: OrderReportServiceService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, readonly authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params.id;
    this.bindDropdowns();
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.RoleMaster,
      this.service.constants.MasterCategories.ClientMaster,
      this.service.constants.MasterCategories.WorkTypeMaster,
      this.service.constants.MasterCategories.ProductMaster,
      this.service.constants.MasterCategories.SizeMaster,
      this.service.constants.MasterCategories.DesignMaster,
      this.service.constants.MasterCategories.StatusMaster,
      this.service.constants.OrderReportCategories.HSN_Master,
      this.service.constants.OrderReportCategories.MeasurementCategory,
      


    ];
    this.service.getLookups(categories, (lookups: any) => {
      this.OrderReportDetailLookups = lookups;
      // this.initialize();
      console.log("this is a Lokkups", lookups);
      // this.WorkTypeArray = lookups[this.service.constants.MasterCategories.WorkTypeMaster];
      // this.ClietMaster = lookups[this.service.constants.MasterCategories.ClientMaster];
      // this.ProductMaster = lookups[this.service.constants.MasterCategories.ProductMaster];
      // this.SizeMaster = lookups[this.service.constants.MasterCategories.SizeMaster];
      // this.DesignMaster = lookups[this.service.constants.MasterCategories.DesignMaster];
      // this.StatusMaster = lookups[this.service.constants.MasterCategories.StatusMaster];

    });
    this.initialize();
  }
  obj: any
  initialize() {
    if (this.requestId) {
      console.log("its in request ID");
      let obj = {
        "OrderId": this.requestId
      }
      this.service.getOrderDetailById(obj).subscribe((response: any) => {
        if (response.status === 200 && response.data) {
          // this.obj = {
          //   assignedManpowerList  : response.data.assignedManpowerList,
          //   request :response.data.request,
          // }
          // if(response.data.request.enquiryStatus == "21")
          // {
          //   response.data.request.isModifyBy = 0;
          //}
          let obj = {
            WorkTypeId : response.data[0].WorkTypeId,
            DesignId : response.data[0].DesignId || null,
            ClientId : response.data[0].ClientId || null,
            ProductId : response.data[0].ProductId || null,
            SizeId : response.data[0].SizeId || null,
            BillNo : response.data[0].BillNo || null,
            TotalItem : response.data[0].TotalItem || null,
            AmountPerOneItem : response.data[0].AmountPerOneItem || null,
            HSN_Code : response.data[0].HSN_Code || null,
            Qty : response.data[0].Qty,
            UOM : response.data[0].UOM || null,
            StatusId : response.data[0].StatusId || 1
          }

          const requestContainer = new AddOrderBasicDetail(obj);
          this.requestForm = this.formBuilder.formGroup(requestContainer);
          console.log( "this is 123",this.requestForm)
          // this.getCurrentStatusValue();

          // this.addForm = new FormGroup({
          //   file: new FormControl(null, Validators.required),
          // });
        }

      });
    } else {
      const requestContainer = new AddOrderBasicDetail();
      this.requestForm = this.formBuilder.formGroup(requestContainer);

    }
  }
  saveNotes() {
    
  }
  onCancel() {
    this.router.navigate(['/OrderReport'])
  }
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("this is a container", container);

      this.service.saveOrder(container).subscribe((response: any) => {
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
    } else {
      console.log("its not valide form");
    }
  }
}
