import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { AddOrderBasicDetail } from 'src/app/library/core/models/add-order-basic-detail.model';
import { ProductionService } from '../production.service';
import { ProductionReportContainer } from 'src/app/library/core/models/report/prodcution/container';
@Component({
  selector: 'app-production-detail',
  templateUrl: './production-detail.component.html',
  styleUrls: ['./production-detail.component.scss']
})
export class ProductionDetailComponent  implements OnInit {
  requestForm: FormGroup;
  addForm: FormGroup;
  requestId: number;
  OrderReportDetailLookups: any;
  constructor(readonly service: ProductionService,
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
      this.service.constants.MasterCategories.ColourMaster

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
        "orderId": this.requestId
      }
      this.service.getProductionDataFromOrderId(obj).subscribe((response: any) => {
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
            ProductionBasicDetail : response.data
          }

          const requestContainer = new ProductionReportContainer(obj);
          this.requestForm = this.formBuilder.formGroup(requestContainer);
          // this.getCurrentStatusValue();

          // this.addForm = new FormGroup({
          //   file: new FormControl(null, Validators.required),
          // });
        }

      });
    } else {
      const requestContainer = new ProductionReportContainer();
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
      console.log("this is a container", container);
      let obj = {
        orderId : this.requestId,
        ManufacturedProduct : container.ProductionBasicDetail
      }

      this.service.addProduction(obj).subscribe((response: any) => {
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
    } else {
      console.log("its not valide form");
    }
  }
}

