

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { CustomerAcquisitionContainer } from 'src/app/library/core/models/customer-acquisition/customer-acquisition.model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { CustomerAcquisitionAddEditService } from './customer-acquisition-add-edit.service';
import { RejectDetailsComponent } from './reject-details/reject-details.component';

@Component({
  selector: 'app-customer-acquisition-add-edit',
  templateUrl: './customer-acquisition-add-edit.component.html',
  styleUrls: ['./customer-acquisition-add-edit.component.scss']
})
export class CustomerAcquisitionAddEditComponent implements OnInit {
  requestForm: FormGroup;
  requestId: number;
  requestDetailLookups: any;
  apiUrl: string = environment.apiUrl;
  blob :any;
  oldUrl: string = environment.oldUrl;
  constructor(
    readonly service: CustomerAcquisitionAddEditService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,readonly authService: AuthService,
    private routeUrl: Router) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params.id;
    this.bindDropdowns();
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.StateMaster,
      this.service.constants.MasterCategories.CityMaster,
      this.service.constants.MasterCategories.ZoneMaster,
      this.service.constants.MasterCategories.ServiceMaster,
      this.service.constants.MasterCategories.CustomerTitle,
      this.service.constants.MasterCategories.CustomerNameType,
      this.service.constants.MasterCategories.OwnershipType,
      this.service.constants.MasterCategories.PaymentMethod,
      this.service.constants.MasterCategories.YesNo,
      this.service.constants.MasterCategories.LPGConnectionName,
      this.service.constants.MasterCategories.AllZoneMaster,
    ];
    this.service.getLookups(categories, (lookups) => {
      this.requestDetailLookups = lookups;
      this.initialize();
    });
  }

  initialize() {
    if (this.requestId && this.requestId != 0 ) {
      this.service.getbyId(this.requestId).subscribe((response: any) => {
        if (response.status === 'success' && response.data) {
          const customerAcquisitionContainer = new CustomerAcquisitionContainer(response.data);
          // console.log('customerAcquisitionContainer',customerAcquisitionContainer)
          this.requestForm = this.formBuilder.formGroup(customerAcquisitionContainer);
          this.getCurrentStatusValue();
        }
      });
    } else {
      const customerAcquisitionContainer = new CustomerAcquisitionContainer();
      this.requestForm = this.formBuilder.formGroup(customerAcquisitionContainer);
    }
  }

  getCurrentStatusValue() {
    // const currentStatus = this.requestDetailLookups[this.service.constants.MasterCategories.ServiceStageMaster].filter((lookup: any) => {
    //   return lookup.keyName === this.requestForm.controls.request.get('currentEnquiryStatus')?.value;
    // });

    // if (currentStatus && currentStatus.length > 0) {
    //   this.requestForm.controls.request.get('currentEnquiryStatusValue')?.setValue(currentStatus[0].displayText);
    // }
    // const currentZone = this.requestDetailLookups[this.service.constants.MasterCategories.ZoneMaster].filter((lookup: any) => {
    //   return lookup.keyName === this.requestForm.controls.request.get('cityId')?.value;
    // });
    
    // if (currentZone && currentZone.length > 0) {
    //   this.requestForm.controls.request.get('currentZoneValue')?.setValue(currentZone[0].displayText);
    // }
    // const currentClient = this.requestDetailLookups[this.service.constants.MasterCategories.ServiceForMaster].filter((lookup: any) => {
    //   return lookup.keyName === this.requestForm.controls.request.get('serviceFor')?.value;
    // });
    
    // if (currentClient && currentClient.length > 0) {
    //   this.requestForm.controls.request.get('currentClientValue')?.setValue(currentClient[0].displayText);
    // }
    
  }

  onSave() {
    
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      container.request.entryBy  = this.service.currentUser?.id.toString();
      container.request.isLPGConnection  = container.request.isLPGConnection == "1" ?true:false ;
      container.request.id  = this.requestId;
      container.request.status  = this.requestId != 0 ?3:1;

      this.service.CustomerAcquistion(container.request).subscribe((response: any) => {
        if (response.status == 'success') {
          this.service.notify.showSuccess('Customer Acquisition saved successfully');
          // this.ngOnInit();
          this.routeUrl.navigate(['/customer-acquisition']);
        } else {
          // console.log(response.errors);
          response.errors.forEach((keys: any, vals: any) => {
            // console.log(keys.errorMessage);
            this.service.notify.showSuccess(keys.errorMessage);
          });
        }
      });
    } else {
      this.requestForm.markAllAsTouched();
      this.service.notify.showError('Please enter all required fields');
    }
  }

  onReject(){
    if (this.requestId) {
      const dialogRef = this.dialog.open(RejectDetailsComponent, {
        data: { requestId: this.requestId},
        width: '800px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.addTaskType(result);
        }
      });
    } else {
      this.service.notify.showError('Please select Customer Acquisition Details');
      //   }
    }
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to cancel your changes?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.routeUrl.navigate(['/customer-acquisition']);
        // this.ngOnInit();
      }
    });
  }



}
