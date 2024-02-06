import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './library/shared/guards/auth.guard';
import { DashboardComponent } from './portal/home/dashboard/dashboard.component';
import { LoginComponent } from './portal/home/login/login.component';
import { LoginNetComponent } from './portal/home/logout-net/logout-net.component';
import { MeterMasterComponent } from './portal/meter-master/meter-master.component';
import { BillingReportComponent } from './portal/reports/billing-report/billing-report.component';
import { CallCenterReportComponent } from './portal/reports/call-center-report/call-center-report.component';
import { DPRNGConversionComponent } from './portal/reports/dpr-ng-conversion/dpr-ng-conversion.component';
import { HelpdeskSR1Component } from './portal/reports/helpdesk-sr1/helpdesk-sr1.component';
import { IncompleteSRStatusReportComponent } from './portal/reports/incomplete-srstatus-report/incomplete-srstatus-report.component';
import { ManpowerAttendanceReportComponent } from './portal/reports/manpower-attendance-report/manpower-attendance-report.component';
import { ManpowerPerformanceReportComponent } from './portal/reports/manpower-performance-report/manpower-performance-report.component';
import { PeTrackerComponent } from './portal/reports/pe-tracker/pe-tracker.component';
import { RFCTrackingReportComponent } from './portal/reports/rfc-tracking-report/rfc-tracking-report.component';
import { TATReportComponent } from './portal/reports/tatreport/tatreport.component';
import { TicketClosureReportComponent } from './portal/reports/ticket-closure-report/ticket-closure-report.component';
import { ProjectReportComponent } from './portal/reports/project-report/project-report.component';
import { MeterialReportComponent } from './portal/reports/meterial-report/meterial-report.component';
import { ConsumptionReportComponent } from './portal/reports/consumption-report/consumption-report.component';
import { MaterialIssueComponent } from './portal/reports/material-issue/material-issue.component';
import { MaterialIssueDetailComponent } from './portal/reports/material-issue/material-issue-detail/material-issue-detail.component';
import { MeterialReportDetailsComponent } from './portal/reports/meterial-report-details/meterial-report-details.component';
//import { ZohoIntegrationComponent } from './portal/reports/zoho-integration/zoho-integration.component';
import { StockReportComponent } from './portal/reports/stock-report/stock-report.component';
import { ContractorReconciliationComponent } from './portal/reports/contractor-reconciliation/contractor-reconciliation.component';
import { DailyProgressReportComponent } from './portal/reports/daily-progress-report/daily-progress-report.component';
import { AddCustomerComponent } from './portal/customer/add-customer/add-customer.component';
import { OrderReportComponent } from './portal/reports/order-report/order-report.component';
import { OrderDetailComponent } from './portal/reports/order-report/order-detail/order-detail.component';
import { ClientReportComponent } from './portal/reports/client-report/client-report.component';
import { ClientDetailComponent } from './portal/reports/client-report/client-detail/client-detail.component';
import { UserReportComponent } from './portal/reports/user-report/user-report.component';
import { UserDetailComponent } from './portal/reports/user-report/user-detail/user-detail.component';
import { StockReportCMComponent } from './portal/reports/stock-report-CM/stock-report.component';
import { StockDetailComponent } from './portal/reports/stock-report-CM/stock-detail/stock-detail.component';
import { SubmitDailyWorkComponent } from './portal/reports/submit-daily-work/submit-daily-work.component';
import { SubmitWorkDetailPageComponent } from './portal/reports/submit-daily-work/submit-work-detail-page/submit-work-detail-page.component';
import { AssignTaskComponent } from './portal/reports/assign-task/assign-task.component';
import { AssignTaskDetailComponent } from './portal/reports/assign-task/assign-task-detail/assign-task-detail.component';
import { ProductionComponent } from './portal/reports/production/production.component';
import { ProductionDetailComponent } from './portal/reports/production/production-detail/production-detail.component';
import { SellMasterComponent } from './portal/reports/sell-master/sell-master.component';
import { SellingDetailComponent } from './portal/reports/sell-master/selling-detail/selling-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'meter-master',
    canActivate: [AuthGuard],
    component: MeterMasterComponent
  },
  {
    path: 'pe-tracker-report',
    canActivate: [AuthGuard],
    component: PeTrackerComponent
  },
  {
    path: 'NG-Tracking-Report',
    canActivate: [AuthGuard],
    component: DPRNGConversionComponent
  },
  {
    path: 'RFC-Tracking-Report',
    canActivate: [AuthGuard],
    component: RFCTrackingReportComponent
  },
  {
    path: 'OrderReport',
    canActivate: [AuthGuard],
    component: OrderReportComponent
  },
  {
    path: 'OrderReportDetail',
    canActivate: [AuthGuard],
    component: OrderDetailComponent
  }, {
    path: 'OrderReport/OrderReportDetail/:id',
    canActivate: [AuthGuard],
    component: OrderDetailComponent
  },
  {
    path: 'DailyWork',
    canActivate: [AuthGuard],
    component: SubmitDailyWorkComponent
  },
  {
    path: 'DailyWorkDetail',
    canActivate: [AuthGuard],
    component: SubmitWorkDetailPageComponent
  },
  {
    path: 'DailyWork/DailyWorkDetail/:id',
    canActivate: [AuthGuard],
    component: SubmitWorkDetailPageComponent
  },
  {
    path: 'Selling',
    canActivate: [AuthGuard],
    component: SellMasterComponent
  },
  {
    path: 'SellingDetail',
    canActivate: [AuthGuard],
    component: SellingDetailComponent
  },
  {
    path: 'ProductionReport/ProdutionReportDetail/:id',
    canActivate: [AuthGuard],
    component: ProductionDetailComponent
  },
  {
    path: 'AssignTask',
    canActivate: [AuthGuard],
    component: AssignTaskComponent
  },
  {
    path: 'AssignTask/AssignTo/:id',
    canActivate: [AuthGuard],
    component: AssignTaskDetailComponent
  },
  {
    path: 'ClientReport',
    canActivate: [AuthGuard],
    component: ClientReportComponent
  },
  {
    path: 'ProductionReport',
    canActivate: [AuthGuard],
    component: ProductionComponent
  },
  {
    path: 'ClientReport',
    canActivate: [AuthGuard],
    component: ClientReportComponent
  },
  {
    path: 'ClientReportDetail',
    canActivate: [AuthGuard],
    component: ClientDetailComponent
  },
  {
    path: 'WorkerReport',
    canActivate: [AuthGuard],
    component: UserReportComponent
  },
  {
    path: 'WorkerDetail',
    canActivate: [AuthGuard],
    component: UserDetailComponent
  },
  {
    path: 'WorkerReport/WorkerDetail/:id',
    canActivate: [AuthGuard],
    component: UserDetailComponent
  },
  {
    path: 'StockReport',
    canActivate: [AuthGuard],
    component: StockReportCMComponent
  },
  {
    path: 'StockDetail',
    canActivate: [AuthGuard],
    component: StockDetailComponent
  },
  {
    path: 'helpdesk-sr1',
    canActivate: [AuthGuard],
    component: HelpdeskSR1Component
  },
  {
    path: 'TicketclosureReport',
    canActivate: [AuthGuard],
    component: TicketClosureReportComponent
  },
  {
    path: 'TATReport',
    canActivate: [AuthGuard],
    component: TATReportComponent
  },
  {
    path: 'ManpowerPerformanceReport',
    canActivate: [AuthGuard],
    component: ManpowerPerformanceReportComponent
  },
  {
    path: 'IncompleteSRStatusReport',
    canActivate: [AuthGuard],
    component: IncompleteSRStatusReportComponent
  },
  {
    path: 'CallCenterReport',
    canActivate: [AuthGuard],
    component: CallCenterReportComponent
  },
  {
    path: 'ManpowerAttendanceReport',
    canActivate: [AuthGuard],
    component: ManpowerAttendanceReportComponent
  },
  {
    path: 'AddCustomer',
    canActivate: [AuthGuard],
    component: AddCustomerComponent
  },
  {
    path: 'BillingReport',
    canActivate: [AuthGuard],
    component: BillingReportComponent
  },
  {
    path: 'ConsumptionReport',
    canActivate: [AuthGuard],
    component: ConsumptionReportComponent
  },
  {
    path: 'ContractorReconciliation',
    canActivate: [AuthGuard],
    component: ContractorReconciliationComponent
  },
  {
    path: 'DailyProgressReport',
    canActivate: [AuthGuard],
    component: DailyProgressReportComponent
  },
  {
    path: 'service-requests',
    canActivate: [AuthGuard],
    loadChildren: () => {
      return import('./portal/service-request/service-request.module').then(mod => mod.ServiceRequestModule);
    }
  },
  {
    path: 'MaterialReport',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MeterialReportComponent,

      },
      {
        path: 'MeterialReportDetails/:materialReceiptId',
        component: MeterialReportDetailsComponent,
      },
    ]
  },
  {
    path: 'MaterialIssue',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'materialIssueDetial/:materialReceiptId',
        component: MaterialIssueDetailComponent
      }, {
        path: '',
        component: MaterialIssueComponent
      }
    ]
  },
  //{
  //  path:'zoho',
  //   canActivate:[AuthGuard],
  //   component:ZohoIntegrationComponent
  // }
  // ,
  {
    path: 'StockReport',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: StockReportComponent
      }
      // ,{
      //   path:'stockReportdetail',
      //   component: MaterialIssueComponent
      // }
    ]
  },
  {
    path: 'customer-acquisition',
    canActivate: [AuthGuard],
    loadChildren: () => {
      return import('./portal/customer-acquisition/customer-acquisition.module').then(mod => mod.CustomerAcquisitionModule);
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logoutNet',
    component: LoginNetComponent
  },
  {
    path: 'ProjectReport',
    canActivate: [AuthGuard],
    component: ProjectReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
