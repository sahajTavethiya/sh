import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { SRDashboardComponent } from './srdashboard/srdashboard.component';
import { MaterialModule } from 'src/app/library/common/material.module';
import { SharedModule } from 'src/app/library/shared/shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { RequestComponent } from './request/request.component';
import { RequestDetailComponent } from './request/request-detail/request-detail.component';
import { CustomerComponent } from './request/customer/customer.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TaskDetailsComponent } from './request/task-details/task-details.component';
import { TaskTypeComponent } from './request/task-details/task-type/task-type.component';
import { ManpowerComponent } from './request/manpower/manpower.component';
import { ManpowerTaskTimeComponent } from './request/manpower/manpower-task-time/manpower-task-time.component';
import { AssignedManpowerComponent } from './request/manpower/assigned-manpower/assigned-manpower.component';
import { SparesConsumablesComponent } from './request/task-details/spares-consumables/spares-consumables.component';
import { ViewImageComponent } from './request/view-image/view-image.component';
import { ViewCustomerDetailsComponent } from './request/view-customer-details/view-customer-details.component';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { UploadCustomerSignatureComponent } from './request/upload-customer-signature/upload-customer-signature.component';
import { CallRecordingUploadComponent } from './request/call-recording-upload/call-recording-upload.component';
import { SrListUpdateComponent } from './srdashboard/sr-list-update/sr-list-update.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AssignManpowerBulkComponent } from './srdashboard/assign-manpower-bulk/assign-manpower-bulk.component';


@NgModule({
  declarations: [
    SRDashboardComponent,
    RequestComponent,
    RequestDetailComponent,
    CustomerComponent,
    ManpowerComponent,
    TaskDetailsComponent,
    TaskTypeComponent,
    ManpowerTaskTimeComponent,
    AssignedManpowerComponent,
    SparesConsumablesComponent,
    ViewImageComponent,
    ViewCustomerDetailsComponent,
    UploadCustomerSignatureComponent,
    CallRecordingUploadComponent,
    SrListUpdateComponent,
    AssignManpowerBulkComponent,
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
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
export class ServiceRequestModule { }
