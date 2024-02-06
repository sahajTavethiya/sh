import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/library/common/material.module';
import { SharedModule } from 'src/app/library/shared/shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomerAcquisitionRoutingModule } from './customer-acquisition-routing.module';
import { CadashboardComponent } from './cadashboard/cadashboard.component';
import { CustomerAcquisitionAddEditComponent } from './customer-acquisition-add-edit/customer-acquisition-add-edit.component';
import { AcquisitionDetailsComponent } from './customer-acquisition-add-edit/acquisition-details/acquisition-details.component';
import { CustomerLPGConnectionDetailsComponent } from './customer-acquisition-add-edit/customer-lpgconnection-details/customer-lpgconnection-details.component';
import { PaymentDetailsComponent } from './customer-acquisition-add-edit/payment-details/payment-details.component';
import { RejectDetailsComponent } from './customer-acquisition-add-edit/reject-details/reject-details.component';


@NgModule({
  declarations: [
  
    CadashboardComponent,
    CustomerAcquisitionAddEditComponent,
    AcquisitionDetailsComponent,
    CustomerLPGConnectionDetailsComponent,
    PaymentDetailsComponent,
    RejectDetailsComponent,

  ],
  imports: [
    CommonModule,
    CustomerAcquisitionRoutingModule,
    MaterialModule,
    SharedModule,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    MultiSelectModule,
    CalendarModule,
    InputMaskModule,
    InputNumberModule
  ],
  providers: [
    FormBuilder
  ]
})
export class CustomerAcquisitionModule { }
