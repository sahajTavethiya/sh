import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { merge } from 'rxjs';
import { DashboardCriteria } from 'src/app/library/core/models/dashboard/dashboard-criteria.model';
import { DashboardService } from './dashboard.service';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  dashboardForm: FormGroup;

  lineChartOptions: any;
  donutChartOptions: any;
  lineColumnChartOptions: any;

  zones: Array<any> = [];
  services: Array<any> = [];
  clients: Array<any> = [];
  dateRanges: Array<any> = [];
  zonewiseSRs: Array<any> = [];
  completedSRs: Array<any> = [];
  statuses: any = {
    ALL: 0, WAPPR: 0, APPR: 0,
    ASGN: 0, INPRG: 0, WCOMP: 0,
    RCOMP: 0, FCOMP: 0, PENDING: 0,
    COMPLETED: 0,UNASSIGNED :0,INPROGRESS:0,
    Delay:0,COMPLETED1: 0,NWORK:0

  };
  defaultStatuses: any = {
    ALL: 0, WAPPR: 0, APPR: 0,
    ASGN: 0, INPRG: 0, WCOMP: 0,
    RCOMP: 0, FCOMP: 0, PENDING: 0,
    COMPLETED: 0,UNASSIGNED :0,INPROGRESS:0,
    Delay:0,COMPLETED1: 0,NWORK:0
  };
  monthWiseData: Array<any>;

  constructor(readonly service: DashboardService,private router:Router,
    readonly formBuilder: RxFormBuilder) {
      
      // this.dashboardForm.valueChanges.subscribe((selectedDate: Date) => {
      //   // Perform any actions or call functions based on the selected date
      //   console.log('Selected date:', selectedDate);
      //   // You can replace the console.log statement with your custom code
      // });
  }

  ngOnInit(): void {
    console.log("its in Dashbord");
    this.bindDropdowns();
    this.initialize();
    // this.initializeLineChart();
    // this.initializeDonutChart();
    // this.lineColumnChart();
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.ZoneMaster,
      this.service.constants.MasterCategories.ServiceMaster,
      this.service.constants.MasterCategories.ServiceStageMaster,
      this.service.constants.MasterCategories.ServiceForMaster,
      this.service.constants.MasterCategories.ServiceGroup,
      this.service.constants.LookupCategories.PreferredTime,
      this.service.constants.LookupCategories.ServicePriority,
    ];
    this.dateRanges = [
      { keyName: '', displayText: '30 Days' },
      { keyName: 'ALL TIME', displayText: 'All Time' },
      { keyName: 'ONE WEEK', displayText: '1 Week' },
      { keyName: 'TWO WEEK', displayText: '2 Week' },
     
    ];

    this.clients.push({ keyName: '', displayText: 'All Clients' });
    this.service.getLookups(categories, (lookups) => {
      this.zones.push(...lookups[this.service.constants.MasterCategories.ZoneMaster]);
      this.services.push(...lookups[this.service.constants.MasterCategories.ServiceMaster]);
      this.clients.push(...lookups[this.service.constants.MasterCategories.ServiceForMaster]);
    });
  }

  initialize() {
    const criteria = new DashboardCriteria();
    this.dashboardForm = this.formBuilder.formGroup(criteria);
    this.detectValueChanges();
    this.search();
  }

  detectValueChanges() {
    // merge(...[
    //   this.dashboardForm.get('zoneIds')?.valueChanges,
    //   this.dashboardForm.get('serviceIds')?.valueChanges,
    //   this.dashboardForm.get('dateString')?.valueChanges,
    //   this.dashboardForm.get('clientId')?.valueChanges
    // ]).subscribe((selectedValue: any) => {
    //   this.search();
    // });

    this.dashboardForm.get('zoneIds')?.valueChanges.subscribe(selected => {
      this.search();
    });

    this.dashboardForm.get('serviceIds')?.valueChanges.subscribe(selected => {
      this.search();
    });

    this.dashboardForm.get('dateString')?.valueChanges.subscribe(selected => {
      this.search();
    });

    this.dashboardForm.get('clientId')?.valueChanges.subscribe(selected => {
      this.search();
    });
    this.dashboardForm.get('fromDate')?.valueChanges.subscribe(selected => {
      this.search();
    });
    this.dashboardForm.get('toDate')?.valueChanges.subscribe(selected => {
      this.search();
    });
  }
  onFromDateSelected(event : any){

  }

  search() {
    console.log(this.dashboardForm.value);
    const criteria = {
      dateString: this.dashboardForm.get('dateString')?.value || '',
      zoneIds: this.dashboardForm.get('zoneIds')?.value || [],
      clientId: this.dashboardForm.get('clientId')?.value || null,
      serviceIds: this.dashboardForm.get('serviceIds')?.value || [],
      fromDate : this.dashboardForm.get('fromDate')?.value || null,
      toDate : this.dashboardForm.get('toDate')?.value || null
    }
    // this.service.searchDashboard(criteria).subscribe((response: any) => {
    //   console.log(response);
    //   if (response && response.data) {
    //     this.zonewiseSRs = response.data.zoneWiseCount;
    //     console.log(this.zonewiseSRs);
    //     if (response.data.statusWiseCount && response.data.statusWiseCount.length > 0) {
    //       this.statuses.WAPPR = this.getStatusWiseCount(response.data.statusWiseCount, 'WAPPR');
    //       this.statuses.APPR = this.getStatusWiseCount(response.data.statusWiseCount, 'APPR');
    //       this.statuses.ASGN = this.getStatusWiseCount(response.data.statusWiseCount, 'ASGN');
    //       this.statuses.INPRG = this.getStatusWiseCount(response.data.statusWiseCount, 'INPRG');
    //       this.statuses.WCOMP = this.getStatusWiseCount(response.data.statusWiseCount, 'WCOMP');
    //       this.statuses.RCOMP = this.getStatusWiseCount(response.data.statusWiseCount, 'RCOMP');
    //       this.statuses.FCOMP = this.getStatusWiseCount(response.data.statusWiseCount, 'FCOMP');
    //       this.statuses.Delay = this.getStatusWiseCount(response.data.statusWiseCount, 'Delay');
    //       this.statuses.NWORK = this.getStatusWiseCount(response.data.statusWiseCount, 'NWORK');

    //       this.statuses.ALL = this.statuses.WAPPR + this.statuses.APPR + this.statuses.ASGN + this.statuses.INPRG
    //         + this.statuses.WCOMP + this.statuses.RCOMP + this.statuses.FCOMP + this.statuses.Delay + this.statuses.NWORK;

    //       this.statuses.PENDING = this.statuses.WAPPR + this.statuses.APPR + this.statuses.ASGN + this.statuses.INPRG;
    //       this.statuses.COMPLETED = this.statuses.WCOMP + this.statuses.RCOMP + this.statuses.FCOMP;



    //       this.statuses.COMPLETED1 = this.statuses.WCOMP + this.statuses.RCOMP +  this.statuses.FCOMP;
    //       this.statuses.UNASSIGNED  = this.statuses.WAPPR + this.statuses.APPR;
    //       this.statuses.INPROGRESS  = this.statuses.INPRG + this.statuses.Delay;


    //     } else {
    //       this.statuses = this.defaultStatuses;
    //     }

    //     this.monthWiseData = response.data.monthWiseCount;
    //     this.completedSRs = response.data.completionDateWiseCount;
    //     this.initializeLineChart();
    //     this.initializeDonutChart();
    //     this.lineColumnChart();
    //   } else {
    //     this.zonewiseSRs = [];
    //     this.statuses = this.defaultStatuses;
    //     this.monthWiseData = [];
    //     this.completedSRs = [];
    //     this.initializeLineChart();
    //     this.initializeDonutChart();
    //     this.lineColumnChart();
    //   }
    // });
  }

  getStatusWiseCount(stages: any, stageCode: string): number {
    let stageCount = 0;
    const selectedStages = stages.filter((item: any) => {
      return item.stageCode === stageCode;
    });

    if (selectedStages && selectedStages.length > 0) {
      stageCount = parseInt(selectedStages[0].noOfSr || 0);
    }

    return stageCount;
  }

  initializeLineChart() {
    const newItems = this.monthWiseData.map(item => item.new) || [];
    const pendingItems = this.monthWiseData.map(item => item.pending) || [];
    const completedItems = this.monthWiseData.map(item => item.completed) || [];
    const months = this.monthWiseData.map(item => item.month) || [];
    this.lineChartOptions = {
      series: [
        {
          name: "Pending",
          data: pendingItems
        },
        {
          name: "Completed",
          data: completedItems
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'COMPLETION VS PENDING TRENDLINE',
        align: 'left',
        style: {
          color: '#2d668e',
          fontSize: '16px',
          fontWeight: '600'
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: months,
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        title: {
          text: ''
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  initializeDonutChart() {
    this.donutChartOptions = {
      series: [this.statuses.COMPLETED, this.statuses.PENDING],
      chart: {
        type: 'donut',
        height: '295'
      },
      title: {
        text: 'ALLOCATION vs COMPLETED',
        align: 'left',
        style: {
          color: '#2d668e',
          fontSize: '16px',
          fontWeight: '600'
        }
      },
      labels: ['Completed', 'Pending'],
      // legend: {
      //   position: 'right',
      //   horizontalAlign: 'right',
      //   floating: true,
      //   offsetY: 25,
      //   offsetX: -5
      // },
      responsive: [{
        breakpoint: 400,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  lineColumnChart() {
    const completedCount = this.completedSRs.map(x => x.noOfSr) || [];
    const completedDates = this.completedSRs.map(x => x.completedDate) || [];
    this.lineColumnChartOptions = {
      series: [{
        name: 'Completed SRs',
        type: 'column',
        data: completedCount
      }, {
        name: 'Completed SRs',
        type: 'line',
        data: completedCount
      }],
      chart: {
        height: 280,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: 'DPR OF SRs COMPLETED ON DAILY BASIS',
        style: {
          color: '#2d668e',
          fontSize: '16px',
          fontWeight: '600'
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: completedDates,
      xaxis: {
        type: 'datetime'
      },
      yaxis: [{
        title: {
          text: '',
        },

      }, {
        opposite: true,
        title: {
          text: ''
        }
      }]
    };
  }

  service_requests(statusIds:any){
    let requestFrom ='';
    let requestTo ='';
    if(this.dashboardForm.get('dateString')?.value == 'ONE WEEK'){
      requestTo =moment(Date.now()).format('YYYY-MM-DD');
      requestFrom = moment(Date.now() - 7 * 24 * 3600 * 1000).format('YYYY-MM-DD')
    }else
    if(this.dashboardForm.get('dateString')?.value == 'TWO WEEK'){
      requestTo =moment(Date.now()).format('YYYY-MM-DD');
      requestFrom = moment(Date.now() - 14 * 24 * 3600 * 1000).format('YYYY-MM-DD')
    }else
    if(this.dashboardForm.get('dateString')?.value == '30 DAYS'){
      requestTo =moment(Date.now()).format('YYYY-MM-DD');
      requestFrom = moment(Date.now() - 30 * 24 * 3600 * 1000).format('YYYY-MM-DD')
    }

    const criteria = {
      requestFrom: requestFrom,
      requestTo: requestTo,
      zones: this.dashboardForm.get('zoneIds')?.value || [],
      serviceForId: this.dashboardForm.get('clientId')?.value || null,
      serviceIds: this.dashboardForm.get('serviceIds')?.value || [],
      statusIds: statusIds
    }
    
    this.router.navigateByUrl('/service-requests', { state: criteria});
  }
}
