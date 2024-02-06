import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: Array<any>;
  DASHBOARD: any;
  oldUrl: string = environment.oldUrl;
  urlAPP = this.oldUrl + '/Account/LoginApp?page='
  token = this.authService.currentUserValue?.token;
  constructor(
    readonly authService: AuthService, readonly router: Router) {
  }

  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    //   let obj =  {
    //     "id": 1002,
    //     "firstName": "manager2",
    //     "roleId": 2,
    //     "emailId": "manager2@gmail.com",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2OTU4OTM5MTg5MzIsImNyZWF0aW9uRGF0ZVRpbWUiOjE2OTU4OTM5MTg5MzIsImlhdCI6MTY5NTg5MzkxOCwiZXhwIjoxNjk4NDg1OTE4LCJpc3MiOiJ0cmFja2luZyJ9.YXc6BIi0saBHg9ds_5X3Bl6xE0Gewzfie-Bp-b4rhGQ"
    // }
    //   localStorage.setItem('currentUser', json.stringify(obj ));
    this.DASHBOARD = this.urlAPP + "DASHBOARD&token=" + this.authService.currentUserValue?.token;
    this.initialize();
  }

  getLink(name: any) {
    return this.urlAPP + name + "&token=" + this.authService.currentUserValue?.token;
  }

  initialize() {

    this.menus = [
      // {
      //   displayName: 'User Management', matIcon: 'manage_accounts',
      //   children: [
      //     // { displayName: 'Manage User', matIcon: 'list', url: this.getLink('MANAGEUSER') ,type:0},
      //     // { displayName: 'Manpower Master', matIcon: 'list', url:  this.getLink('MANPOWER') ,type:0}
      //   ]
      // },
      {
        displayName: 'Service Master', matIcon: 'dashboard',
        children: [
          // { displayName: 'Service Master', matIcon: 'list', url: this.getLink('SERVICEMASTER'),type:0},
          // { displayName: 'Service Category', matIcon: 'list', url: this.getLink('SERVICECATEGORY'),type:0},
          // { displayName: 'Service Sub Category', matIcon: 'list', url: this.getLink('SUBCATEGORY'),type:0},
          // { displayName: 'Material Category Master', matIcon: 'list', url: this.getLink('MATERIALCATEGORY'),type:0},
          // { displayName: 'Material Master', matIcon: 'list', url: this.getLink('MATERIALMASTER'),type:0},
          // { displayName: 'Control Room Master', matIcon: 'list', url: this.getLink('LOCALITYMASTER'),type:0},
          { displayName: 'Bulk Upload Meter Details', matIcon: 'list', url: this.getLink('BULKUPLOADMETER'), type: 0 }
        ]
      },
      {
        displayName: 'Customer', matIcon: 'dashboard',
        children: [
          { displayName: 'Manage Customer', matIcon: 'list', url: this.getLink('CLIENT'), type: 0 },
          { displayName: 'Add Customer', matIcon: 'list', url: '/AddCustomer', type: 1 },
          { displayName: 'Manage Meter Numbers', matIcon: 'list', url: '/meter-master', type: 1 },
          { displayName: 'Bulk Upload', matIcon: 'list', url: this.getLink('BULKUPLOADCUSTOMER'), type: 0 },
          // { displayName: 'Manage Customer Acquisition', matIcon: 'list', url: this.getLink('CUSTOMERACQUISITION'),type:0 },
          { displayName: 'Manage Customer Acquisition', matIcon: 'list', url: '/customer-acquisition', type: 1 }

        ]
      },
      {
        displayName: 'Service Requests', matIcon: 'dashboard',
        children: [
          { displayName: 'Service Requests', matIcon: 'list', url: '/service-requests', type: 1 },
          { displayName: 'Bulk Upload', matIcon: 'list', url: this.getLink('BULKUPLOADSR'), type: 0 },
          { displayName: 'Bulk Upload Call Details', matIcon: 'list', url: this.getLink('BULKUPLOADCALL'), type: 0 },
          { displayName: 'Change SR Status', matIcon: 'list', url: this.getLink('SERVICEREQUESTCHANGESTATUS'), type: 0 },
        ]
      },
      {
        displayName: 'Location Reports', matIcon: 'dashboard',
        children: [
          { displayName: 'View Manpower Location', matIcon: 'list', url: this.getLink('MANPOWERLOCATIONREPORT'), type: 0 },
          { displayName: 'View Manpower Location Details', matIcon: 'list', url: this.getLink('MANPOWERLOCATIONREPORTDETAIL'), type: 0 }
        ]
      },
      {
        displayName: 'Reports', matIcon: 'dashboard',
        children: [
          // { displayName: 'Helpdesk SR1', matIcon: 'list', url: '/helpdesk-sr1' ,type:1},
          // { displayName: 'Attendance Report', matIcon: 'list', url: '/ManpowerAttendanceReport' ,type:1},
          // { displayName: 'DPR-NG Conversion', matIcon: 'list', url: '/NG-Tracking-Report' ,type:1},
          // { displayName: 'DPR-RFC Tracker', matIcon: 'list', url: '/RFC-Tracking-Report' ,type:1},
          // { displayName: 'PE Tracker Report', matIcon: 'list', url: '/pe-tracker-report' ,type:1},
          // { displayName: 'Call Center Report', matIcon: 'list', url: '/CallCenterReport' ,type:1},//
          // { displayName: 'Ticket Closure Report', matIcon: 'list', url: '/TicketclosureReport' ,type:1},
          // { displayName: 'Manpower Performance Report', matIcon: 'list', url: '/ManpowerPerformanceReport',type:1 },
          // { displayName: 'Billing Report', matIcon: 'list', url: '/BillingReport' ,type:1},
          // { displayName: 'Incomplete SR Status Report', matIcon: 'list', url: '/IncompleteSRStatusReport' ,type:1},//panding
          // { displayName: 'TAT Report', matIcon: 'list', url: '/TATReport' ,type:1},
          // { displayName: 'Project Report', matIcon: 'list', url: '/ProjectReport' ,type:1},
          // { displayName: 'Material Receipt Report', matIcon: 'list', url: '/MaterialReport' ,type:1},
          // { displayName: 'Material Issue', matIcon: 'list', url: '/MaterialIssue' ,type:1},
          // { displayName: 'Consumption Report', matIcon: 'list', url: '/ConsumptionReport' ,type:1},
          // { displayName: 'Stock Report', matIcon: 'list', url: '/StockReport' ,type:1},
          // { displayName: 'Contractor Reconciliation Report', matIcon: 'list', url: '/ContractorReconciliation' ,type:1},
          // { displayName: 'Daily Progress Report', matIcon: 'list', url: '/DailyProgressReport' ,type:1},
          { displayName: 'Order Report', matIcon: 'list', url: '/OrderReport', type: 1 },
          { displayName: 'Client Report', matIcon: 'list', url: '/ClientReport', type: 1 },
          { displayName: 'Worker Report', matIcon: 'list', url: '/WorkerReport', type: 1 },
          { displayName: 'Stock Report', matIcon: 'list', url: '/StockReport', type: 1 },
          { displayName: 'Daily Work Report', matIcon: 'list', url: '/DailyWork', type: 1 },
          { displayName: 'Assign Task', matIcon: 'list', url: '/AssignTask', type: 1 },
          { displayName: 'Production Report', matIcon: 'list', url: '/ProductionReport', type: 1 },
          { displayName: 'Sell Report', matIcon: 'list', url: '/Selling', type: 1 },




          //  { displayName: 'ZOHO', matIcon: 'list', url: '/zoho' ,type:1},

          // { displayName: 'Helpdesk SR1', matIcon: 'list', url: this.getLink('HELPDESKSR') ,type:0},
          // { displayName: 'Attendance Report', matIcon: 'list', url: this.getLink('MANPOWERATTENDANCEREPORT') ,type:0},
          // { displayName: 'DPR-NG Conversion', matIcon: 'list', url: this.getLink('COMPLETESERVICEREQUEST') ,type:0},
          // { displayName: 'DPR-RFC Tracker', matIcon: 'list', url: this.getLink('RFCCOMPLETESERVICEREQUEST') ,type:0},
          // { displayName: 'Call Center Report', matIcon: 'list', url: this.getLink('CALLCENTERREPORT') ,type:0},
          // { displayName: 'Ticket Closure Report', matIcon: 'list', url: this.getLink('TICKETCLOSUREREPORT') ,type:0},
          // { displayName: 'Manpower Performance Report', matIcon: 'list', url: this.getLink('MANPOWERPERFORMANCEREPORT'),type:0 },
          // { displayName: 'Billing Report', matIcon: 'list', url: this.getLink('BILLINGREPORT') ,type:0},
          // { displayName: 'Incomplete SR Status Report', matIcon: 'list', url: this.getLink('INCOMPLETESRSTATUSREPORT') ,type:0},
          // { displayName: 'TAT Report', matIcon: 'list', url: this.getLink('TATREPORT') ,type:0}
        ]
      }
    ];
  }

  oldAppClick(URL: any) {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (json.id) {
      window.open(URL, "_blank");
    } else {
      window.location.reload();
      // this.router.navigate(['/login']);;
      console.log(json)
    }


  }
}
