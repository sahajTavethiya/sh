import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { ProductionReportContainer } from 'src/app/library/core/models/report/prodcution/container';
import { SellService } from '../sell.service';
import { SellingContainer } from 'src/app/library/core/models/report/sellingReport/container';
@Component({
  selector: 'app-selling-detail',
  templateUrl: './selling-detail.component.html',
  styleUrls: ['./selling-detail.component.scss']
})
export class SellingDetailComponent implements OnInit {
  requestForm: FormGroup;
  addForm: FormGroup;
  requestId: number;
  OrderReportDetailLookups: any;
  constructor(readonly service: SellService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, readonly authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params.id;
    this.bindDropdowns();
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.ClientMaster,
      this.service.constants.MasterCategories.WorkTypeMaster,
      this.service.constants.MasterCategories.ProductMaster,
      this.service.constants.MasterCategories.SizeMaster,
      this.service.constants.MasterCategories.DesignMaster,
      this.service.constants.MasterCategories.ColourMaster,
      this.service.constants.MasterCategories.HSN_Master


    ];
    this.service.getLookups(categories, (lookups: any) => {
      this.OrderReportDetailLookups = lookups;
      console.log("this is a Lokkups", lookups);
    });
    this.initialize();
  }
  obj: any
  initialize() {
    if (this.requestId) {
      console.log("its in request ID");
      let obj = {
        "orderId": this.requestId
      }
      this.service.getProductionDataFromOrderId(obj).subscribe((response: any) => {
        if (response.status === 200 && response.data) {
          let obj = {
            ProductionBasicDetail : response.data
          }

          const requestContainer = new SellingContainer();
          this.requestForm = this.formBuilder.formGroup(requestContainer);
        }
      });
    } else {
      const requestContainer = new SellingContainer();
      this.requestForm = this.formBuilder.formGroup(requestContainer);
    }
  }
  saveNotes() {
    
  }
  onCancel() {
    this.router.navigate(['/ProductionReport'])
  }
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log(container);
      
      let obj = {
        CustomerName : container.request.customerName,
        EmailId : container.request.emailId,
        Address : container.request.address,
        Mobile : container.request.mobile,
        GST_No : container.request.gstNo,
        StateAndCode : container.request.stateAndCode,
        SellingTableType : container.SellProductDetail
      }
console.log(obj);

      // this.service.addProduction(obj).subscribe((response: any) => {
      //   console.log(response);
      //   return this.service.notify.showSuccess(response.message);
      // })
    } else {
      console.log("its not valide form");
    }
  }
}

