import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './library/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HeaderComponent } from './portal/home/header/header.component';
import { FooterComponent } from './portal/home/footer/footer.component';
import { LoginComponent } from './portal/home/login/login.component';
import { MaterialModule } from './library/common/material.module';
import { MenuComponent } from './portal/home/menu/menu.component';
import { SidebarDirective } from './portal/home/menu/sidebar.directive';
import { ButtonModule } from 'primeng/button';
import { ConfirmationDialogComponent } from './library/shared/confirmation-dialog/confirmation-dialog.component';
import { ChangePasswordComponent } from './portal/home/header/change-password/change-password.component';
import { DashboardComponent } from './portal/home/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MeterMasterComponent } from './portal/meter-master/meter-master.component';

import { DialogModule } from 'primeng/dialog';
import { PeTrackerComponent } from './portal/reports/pe-tracker/pe-tracker.component';
import { DPRNGConversionComponent } from './portal/reports/dpr-ng-conversion/dpr-ng-conversion.component';
import { RFCTrackingReportComponent } from './portal/reports/rfc-tracking-report/rfc-tracking-report.component';
import { HelpdeskSR1Component } from './portal/reports/helpdesk-sr1/helpdesk-sr1.component';
import { TicketClosureReportComponent } from './portal/reports/ticket-closure-report/ticket-closure-report.component';
import { ManpowerAttendanceReportComponent } from './portal/reports/manpower-attendance-report/manpower-attendance-report.component';
import { BillingReportComponent } from './portal/reports/billing-report/billing-report.component';
import { TATReportComponent } from './portal/reports/tatreport/tatreport.component';
import { IncompleteSRStatusReportComponent } from './portal/reports/incomplete-srstatus-report/incomplete-srstatus-report.component';
import { ManpowerPerformanceReportComponent } from './portal/reports/manpower-performance-report/manpower-performance-report.component';
import { CallCenterReportComponent } from './portal/reports/call-center-report/call-center-report.component';
import { ProjectReportComponent } from './portal/reports/project-report/project-report.component';
import { MeterialReportComponent } from './portal/reports/meterial-report/meterial-report.component';
import { ConsumptionReportComponent } from './portal/reports/consumption-report/consumption-report.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MaterialIssueComponent } from './portal/reports/material-issue/material-issue.component';
import { MaterialIssueDetailComponent } from './portal/reports/material-issue/material-issue-detail/material-issue-detail.component';
import { MeterialReportDetailsComponent } from './portal/reports/meterial-report-details/meterial-report-details.component';
import { StockReportComponent } from './portal/reports/stock-report/stock-report.component';
import { ViewDocumentComponent } from './portal/reports/view-document/view-document.component';
import { ViewReciptDocumentComponent } from './portal/reports/view-recipt-document/view-recipt-document.component';
import { ContractorReconciliationComponent } from './portal/reports/contractor-reconciliation/contractor-reconciliation.component';
import { DailyProgressReportComponent } from './portal/reports/daily-progress-report/daily-progress-report.component';
import { ViewDPRDocumentComponent } from './view-dpr-document/view-dpr-document.component';
import { AddCustomerComponent } from './portal/customer/add-customer/add-customer.component';
import { UserRequestComponent } from './portal/customer/user-request/user-request.component';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { AddUserContactDetailComponent } from './portal/customer/add-user-contact-detail/add-user-contact-detail.component';
import { UserBankDetailComponent } from './portal/customer/user-bank-detail/user-bank-detail.component';
import { ContractorEmployeeComponent } from './portal/customer/contractor-employee/contractor-employee.component';
import { OrderReportComponent } from './portal/reports/order-report/order-report.component';
import { OrderDetailComponent } from './portal/reports/order-report/order-detail/order-detail.component';
import { BasicDetailOfOrderComponent } from './portal/reports/order-report/order-detail/basic-detail-of-order/basic-detail-of-order.component';
import { ClientReportComponent } from './portal/reports/client-report/client-report.component';
import { ClientDetailComponent } from './portal/reports/client-report/client-detail/client-detail.component';
import { BasicDetailOfClientComponent } from './portal/reports/client-report/client-detail/basic-detail-of-client/basic-detail-of-client.component';
import { UserReportComponent } from './portal/reports/user-report/user-report.component';
import { UserDetailComponent } from './portal/reports/user-report/user-detail/user-detail.component';
import { BasicDetailOfUserComponent } from './portal/reports/user-report/user-detail/basic-detail-of-user/basic-detail-of-user.component';
import { StockReportCMComponent } from './portal/reports/stock-report-CM/stock-report.component';
import { StockDetailComponent } from './portal/reports/stock-report-CM/stock-detail/stock-detail.component';
import { BasicDetailOfStockComponent } from './portal/reports/stock-report-CM/stock-detail/basic-detail-of-stock/basic-detail-of-stock.component';
import { AssignTaskComponent } from './portal/reports/assign-task/assign-task.component';
import { SubmitDailyWorkComponent } from './portal/reports/submit-daily-work/submit-daily-work.component';
import { SubmitWorkDetailPageComponent } from './portal/reports/submit-daily-work/submit-work-detail-page/submit-work-detail-page.component';
import { SubmitWorkBasicDetailComponent } from './portal/reports/submit-daily-work/submit-work-detail-page/submit-work-basic-detail/submit-work-basic-detail.component';
import { AddSubmitWorkDetailPopupComponent } from './portal/reports/submit-daily-work/submit-work-detail-page/submit-work-basic-detail/add-submit-work-detail-popup/add-submit-work-detail-popup.component';
import { AssignTaskDetailComponent } from './portal/reports/assign-task/assign-task-detail/assign-task-detail.component';
import { AssignTaskDetailPageComponent } from './portal/reports/assign-task/assign-task-detail/assign-task-detail-page/assign-task-detail-page.component';
import { AssignTaskDetailDialogComponent } from './portal/reports/assign-task/assign-task-detail/assign-task-detail-page/assign-task-detail-dialog/assign-task-detail-dialog.component';
import { ProductionComponent } from './portal/reports/production/production.component';
import { ProductionDetailComponent } from './portal/reports/production/production-detail/production-detail.component';
import { ProductionBasicDetailComponent } from './portal/reports/production/production-detail/production-basic-detail/production-basic-detail.component';
import { ProductionDetailPopUpComponent } from './portal/reports/production/production-detail/production-basic-detail/production-detail-pop-up/production-detail-pop-up.component';
import { SellMasterComponent } from './portal/reports/sell-master/sell-master.component';
import { SellingDetailComponent } from './portal/reports/sell-master/selling-detail/selling-detail.component';
import { SellCustomerDetailComponent } from './portal/reports/sell-master/selling-detail/sell-customer-detail/sell-customer-detail.component';
import { SellProductDetailComponent } from './portal/reports/sell-master/selling-detail/sell-product-detail/sell-product-detail.component';
import { CommonDetailsComponent } from './portal/reports/common-details/common-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MenuComponent,
    SidebarDirective,
    ConfirmationDialogComponent,
    ChangePasswordComponent,
    DashboardComponent,
    MeterMasterComponent,
    PeTrackerComponent,
    DPRNGConversionComponent,
    RFCTrackingReportComponent,
    HelpdeskSR1Component,
    TicketClosureReportComponent,
    ManpowerAttendanceReportComponent,
    BillingReportComponent,
    TATReportComponent,
    IncompleteSRStatusReportComponent,
    ManpowerPerformanceReportComponent,
    CallCenterReportComponent,
    ProjectReportComponent,
    MeterialReportComponent,
    ConsumptionReportComponent,
    MeterialReportDetailsComponent,
    MaterialIssueDetailComponent,
    MaterialIssueComponent,
    StockReportComponent,
    ViewDocumentComponent,
    ViewReciptDocumentComponent,
    ContractorReconciliationComponent,
    DailyProgressReportComponent,
    ViewDPRDocumentComponent,
    AddCustomerComponent,
    UserRequestComponent,
    AddUserContactDetailComponent,
    UserBankDetailComponent,
    ContractorEmployeeComponent,
    OrderReportComponent,
    OrderDetailComponent,
    BasicDetailOfOrderComponent,
    ClientReportComponent,
    ClientDetailComponent,
    BasicDetailOfClientComponent,
    UserReportComponent,
    UserDetailComponent,
    BasicDetailOfUserComponent,
    StockReportCMComponent,
    StockDetailComponent,
    BasicDetailOfStockComponent,
    AssignTaskComponent,
    SubmitDailyWorkComponent,
    SubmitWorkDetailPageComponent,
    SubmitWorkBasicDetailComponent,
    AddSubmitWorkDetailPopupComponent,
    AssignTaskDetailComponent,
    AssignTaskDetailPageComponent,
    AssignTaskDetailDialogComponent,
    ProductionComponent,
    ProductionDetailComponent,
    ProductionBasicDetailComponent,
    ProductionDetailPopUpComponent,
    SellMasterComponent,
    SellingDetailComponent,
    SellCustomerDetailComponent,
    SellProductDetailComponent,
    CommonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DropdownModule,
    MaterialModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    NgApexchartsModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    InputMaskModule,
    CalendarModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosistion: 'center'
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
