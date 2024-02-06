import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SearchSRCriteria } from 'src/app/library/core/models/service-request/search-sr-criteria.model';
 
import { Location } from '@angular/common';


import { MatChipInputEvent } from '@angular/material/chips';
import { LazyLoadEvent } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ReportsService } from '../reports.service';
import { ManpowerPerformanceReportModel } from 'src/app/library/core/models/report/manpower-performance-report.model';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as moment from 'moment';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-manpower-performance-report',
  templateUrl: './manpower-performance-report.component.html',
  styleUrls: ['./manpower-performance-report.component.scss']
})
export class ManpowerPerformanceReportComponent implements OnInit {
  oldUrl: string = environment.oldUrl;
  searchForm: FormGroup;
  apiUrl: string = environment.apiUrl;
  getbulkSelect: Array<any> = [];
  zones: Array<any>;
  zonesAll: Array<any> = [];
  blob: any;
  clients: Array<any> = [];
  customers: Array<any>;
  displayArr: Array<any> = [];
  searchData: any
  statusIdsName: Array<any> = [];
  zonesName: Array<any> = [];
  employeeName: Array<any> = [];
  clientsName: Array<any> = [];
  serviceIdsName: Array<any> = [];
  employeeIdsName: Array<any> = [];
  serviceNames: Array<any>;
  isgeneratePDFs = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  displayModal: boolean;
  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalRecords = 0;
  sotingname = '';
  OrderBy = 'Asc';
  textsearch: any = '';
  isAllSelect: boolean = false;

  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  cols: Array<any>;
  serviceRequests: Array<ManpowerPerformanceReportModel>;
  @ViewChild('customerId') customerId: ElementRef<HTMLInputElement>;

  constructor(readonly service: ReportsService, readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,private location:Location) {

  }

  ngOnInit(): void {

    
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (json.roleID == 1 || json.roleID == 2) {
      this.isgeneratePDFs = true;
    }
    this.bindColumns();
    this.bindDropdowns();
    
    
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.ServiceForMaster,
      this.service.constants.MasterCategories.ServiceMaster,
      this.service.constants.MasterCategories.ServiceStageMaster,
      this.service.constants.MasterCategories.ZoneMaster];

      this.clients.push({ keyName: '', displayText: 'All Clients' });
    this.service.getLookups(categories, ((lookups: any) => {
      console.log(JSON.stringify(lookups));
      if (lookups) {
        this.clients.push(...lookups[this.service.constants.MasterCategories.ServiceForMaster]);
        this.zones = lookups[this.service.constants.MasterCategories.ZoneMaster];
        this.serviceNames = lookups[this.service.constants.MasterCategories.ServiceMaster];

      }
    }));
    this.initialize();
  }

  showBasicDialog() {
    this.displayModal = true;
  }



  bindColumns() {
    this.cols = [
      { header: 'Manpower Name', field: 'employeeName' },
      { header: 'Service Category', field: 'categoryName' },
      { header: 'Quantity', field: 'quantity' },
      { header: 'Amount', field: 'price' },
      { header: 'Customer ID', field: 'customerId' },
      { header: 'SR status', field: 'enquiryStatus' },
      { header: 'House Image', field: 'houseAddressImage' },
      { header: 'Meter Image', field: 'meterImage' },
      { header: 'Job Image', field: 'applianceImage' },
      { header: 'Accept status', field: 'acceptReject' },
      { header: 'Accepted Date & Time', field: 'startTime' },
      { header: 'Delay Reason', field: 'delayReason' },
      { header: 'Burners', field: 'burnerDetails' },
      { header: 'Service Rating', field: 'serviceRating' },
      { header: 'Technician Rating', field: 'technicianRating' },
      { header: 'Assigned Date & Time', field: 'assignedDate' },
      { header: 'Delay Selection date & time', field: 'delaySelectionDate' },
      { header: 'Completion Date & time', field: 'completionDate' },
      { header: 'Start work date & time', field: 'startworkDate' },
      { header: 'Close Date', field: 'closeDate' }



    ];
  }
  sotingData(name: any) {
    if (name != "action") {
      if (this.sotingname != name) {
        this.OrderBy = 'Asc';
      } else {
        this.OrderBy = this.OrderBy == 'Desc' ? 'Asc' : 'Desc';
      }
      this.sotingname = name;
      this.paginateData[0] = this.paginateDataedit[0];
      this.paginateData[1] = this.paginateDataedit[1];
      this.search();
    }

  }


  initialize() {
    const searchCriteria = new ManpowerPerformanceReportModel();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    // this.searchForm.patchValue({requestFrom: moment(Date.now() - 1 * 24 * 3600 * 1000).format('YYYY-MM-DD')})
    // this.searchForm.patchValue({requestTo: moment(Date.now()).format('YYYY-MM-DD')})
    // this.search();
  }

  reset() {
    this.searchForm.reset();
    this.displayArr = [];
    this.totalRecords = 0
    this.serviceRequests = new Array<ManpowerPerformanceReportModel>();
  }

  
  onChange(event:any){
console.log(event.value);

    this.service.GetEmployeeListByZoneId(event.value).subscribe((response: any) => {
      console.log(response);
      if (response && response.data && response.data.length > 0) {
        this.employeeIdsName = response.data;
      }
      else {
        this.employeeIdsName = [];
      }
    });
  }
  

  search() {
    this.isAllSelect = false;
    // console.log(this.zones);
    this.getbulkSelect = [];

    if (this.searchForm.valid) {
    
      this.displayModal = false;
      let data = this.searchForm.getRawValue();
      console.log(data);
      this.searchData = {
        fromDate: data.requestFrom,
        toDate: data.requestTo,
        employeeIds:data.employeeIds && data.employeeIds.length > 0 ? data.employeeIds : [],
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        serviceIds: data.serviceIds && data.serviceIds.length > 0 ? data.serviceIds : [],
        serviceForId:data.serviceForId !='' ? data.serviceForId  : null,
        take: this.paginateData[1],
        skip: this.paginateData[0],
        orderBy: this.sotingname == '' ? 'employeeName' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
        
      }
      console.log(this.searchData);
      this.displayArr = [];
      
      
      if (data.requestFrom != null && data.requestTo != null) {
        var ss = 'Date: Between ' + this.service.Moment(data.requestFrom).format("MM-DD-YYYY") + ' To ' + this.service.Moment(data.requestTo).format("MM-DD-YYYY");
        this.displayArr.push(ss);
      } else if (data.requestFrom != null) {
        var ss = 'Date: From ' + this.service.Moment(data.requestFrom).format("MM-DD-YYYY");
        this.displayArr.push(ss);
      } else if (data.requestTo != null) {
        var ss = 'Date: To ' + this.service.Moment(data.requestTo).format("MM-DD-YYYY");
        this.displayArr.push(ss);
      }
      if (data.serviceIds != null && data.serviceIds != '') {
        this.serviceIdsName = [];
        this.searchData.serviceIds.forEach((keys: any, vals: any) => {
          this.serviceNames.forEach(x => {
            if (x.keyName.includes(keys)) {
              if (x.keyName === keys) {
                this.serviceIdsName.push(x.displayText)
              }
            }
          });
        })
        var ss = 'Service Name:' + this.serviceIdsName.join(',');
        this.displayArr.push(ss);
      }
      if (data.zones != null && data.zones != '') {
        this.zonesName = [];
        this.searchData.zoneIds.forEach((keys: any, vals: any) => {
          this.zones.forEach(x => {
            if (x.keyName.includes(keys)) {
              if (x.keyName === keys) {
                this.zonesName.push(x.displayText)
              }
            }
          });
        })
        var ss = 'Zones:' + this.zonesName.join(',');
        this.displayArr.push(ss);
      }

      if (data.employeeIds != null && data.employeeIds != '') {
        this.employeeName = [];
        this.searchData.employeeIds.forEach((keys: any, vals: any) => {
          this.employeeIdsName.forEach(x => {
            if (x.keyName.includes(keys)) {
              if (x.keyName === keys) {
                this.employeeName.push(x.displayText)
              }
            }
          });
        })
        var ss = 'EmployeeName:' + this.employeeName.join(',');
        this.displayArr.push(ss);
      }
      
      if (data.serviceForId != null && data.serviceForId != '') {
        var ss = 'Clients:' + this.clients.filter(x => x.keyName == data.serviceForId)[0].displayText;
        this.displayArr.push(ss);
      }

     
      
      this.service.ManpowerPerformance(this.searchData).subscribe((response: any) => {
        if (response && response.data && response.data.result.length > 0) {
          this.serviceRequests = response.data.result;
          this.paginateData[0] = 0;
          this.totalRecords = response.data.rowCount;
        }
        else {
          this.serviceRequests = [];
          this.paginateData[0] = 0;
          this.totalRecords = 0;
        }
      });
    } else {
      this.service.notify.showError('Please enter the criteria');
    }
    // this.searchForm.reset();
  }

  


  removeSearching(data: string): void {
    const index = this.displayArr.indexOf(data);
    if (index >= 0) {
      var removeData = data.split(':');
      if (removeData[0] == 'Date') {
        this.searchForm.get('requestFrom')?.setValue(null);
        this.searchForm.get('requestTo')?.setValue(null);
      }  else if (removeData[0] == 'Service Name') {
        this.searchForm.get('serviceIds')?.setValue(null);
      } else if (removeData[0] == 'Zones') {
        this.searchForm.get('zones')?.setValue(null);
      } else if (removeData[0] == 'EmployeeName') {
        this.searchForm.get('employeeIds')?.setValue(null);
      } else if (removeData[0] == 'Clients') {
        this.searchForm.get('serviceForId')?.setValue(null);
      } else if (removeData[0] == 'Status') {
        this.searchForm.get('statusIds')?.setValue(null);
      }


      else {
        
        this.searchForm.get(removeData[0])?.setValue(null);
      }
      this.search();
    }
  }
 
  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    this.search();

  }

  exportCSV() {
    let data = this.searchForm.getRawValue();
    let searchData = {
        fromDate: data.requestFrom,
        toDate: data.requestTo,
        employeeIds:data.employeeIds && data.employeeIds.length > 0 ? data.employeeIds : [],
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        serviceIds: data.serviceIds && data.serviceIds.length > 0 ? data.serviceIds : [],
        serviceForId:data.serviceForId !='' ? data.serviceForId  : null,
        search: this.textsearch,
    }


    this.service.ManpowerPerformance(searchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.export(response.data.result);
      }
    });
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(ele => {
      let singalData = {
      'Manpower Name' : ele.employeeName,
      'Service Category' : ele.categoryName,
      'Quantity' : ele.quantity,
      'Amount' : ele.price,
      'Customer ID' : ele.customerId,
      'SR status' : ele.enquiryStatus,
      'House Image' : ele.houseAddressImage,
      'Meter Image' : ele.meterImage,
      'Job Image' : ele.applianceImage,
      'Accept status' : ele.acceptReject,
      'Accepted Date & Time' : ele.startTime,
      'Delay Reason' : ele.delayReason,
      'Burners' : ele.burnerDetails,
      'Service Rating' : ele.serviceRating,
      'Technician Rating' : ele.technicianRating,
      'Assigned Date & Time' : ele.assignedDate != null ? this.service.Moment(ele.assignedDate).format("MM-DD-YYYY h:mm a"):'',
      'Delay Selection date & time' : ele.delaySelectionDate != null ? this.service.Moment(ele.delaySelectionDate).format("MM-DD-YYYY h:mm a"):'',
      'Completion Date & time' : ele.completionDate != null ? this.service.Moment(ele.completionDate).format("MM-DD-YYYY h:mm a"):'',
      'Start work date & time' : ele.startworkDate != null ? this.service.Moment(ele.startworkDate).format("MM-DD-YYYY h:mm a"):'',
      'Close Date' : ele.closeDate != null ? this.service.Moment(ele.closeDate).format("MM-DD-YYYY"):'',
      }
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
    { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Manpower Performance Report'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Manpower Performance Report '+Dateto+'.xlsx'); // initiate a file download in browser
  }


  

  


  searchbox(val: any) {
    console.log(val);
    this.textsearch = val;

    this.search();
  }


  DownloadPDFs() {
    if (this.getbulkSelect.length != 0) {

      console.log(this.getbulkSelect);
      this.serviceIdsName = [];
      this.getbulkSelect.forEach(x => {
          this.serviceIdsName.push(x.id)
          
      });

      console.log(this.serviceIdsName);
      this.service.DownloadJMRs(this.serviceIdsName).subscribe((data:any) => {
        if(data.status = "success"){
          let url  = data.data;
          console.log(url);
          window.open(url, "_self");
        }else{
          this.service.notify.showError('File Not Found');
        }
        
      
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
  }


}




