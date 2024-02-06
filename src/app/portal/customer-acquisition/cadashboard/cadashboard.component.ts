
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SearchSRResultModel } from 'src/app/library/core/models/service-request/search-sr-result.model';
import { CADashboardService } from './cadashboard.service';
import { Location } from '@angular/common';


import { MatChipInputEvent } from '@angular/material/chips';
import { LazyLoadEvent } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MatCheckboxChange } from '@angular/material/checkbox';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SearchCACriteria } from 'src/app/library/core/models/customer-acquisition/search-ca-criteria.model';



@Component({
  selector: 'app-cadashboard',
  templateUrl: './cadashboard.component.html',
  styleUrls: ['./cadashboard.component.scss']
})
export class CadashboardComponent implements OnInit {
  oldUrl: string = environment.oldUrl;
  searchForm: FormGroup;

  getbulkSelect: Array<any> = [];
  zonesAll: Array<any> = [];
  blob: any;
  StatusArr: Array<any>;
  customers: Array<any>;
  filteredCustomers: Array<any> = [];
  displayArr: Array<any> = [];
  searchData: any
  statusIdsName: Array<any> = [];
  zonesName: Array<any> = [];
  serviceIdsName: Array<any> = [];

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
  dashboardSearch: any;


  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  cols: Array<any>;
  CustomerAcquisitions: Array<SearchSRResultModel>;
  @ViewChild('customerId') customerId: ElementRef<HTMLInputElement>;

  constructor(readonly service: CADashboardService, readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,private location:Location,
    private routeUrl: Router) {

  }

  ngOnInit(): void {
    this.dashboardSearch = this.location.getState();

    
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (json.roleID == 1 || json.roleID == 2) {
      this.isgeneratePDFs = true;
    }
    this.bindColumns();
    this.bindDropdowns();
    
    
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.LookupCategories.ServicePriority,
      this.service.constants.LookupCategories.PreferredTime,
      this.service.constants.MasterCategories.ServiceMaster,
      this.service.constants.MasterCategories.ServiceStageMaster,
      this.service.constants.MasterCategories.CustomerStatus,
      this.service.constants.MasterCategories.ZoneMaster];

    this.service.getLookups(categories, ((lookups: any) => {
      // console.log(JSON.stringify(lookups));
      if (lookups) {
        this.StatusArr = lookups[this.service.constants.MasterCategories.CustomerStatus];
      }
    }));
    this.initialize();
  }

  showBasicDialog() {
    this.displayModal = true;
  }



  bindColumns() {
    this.cols = [//Lead Number
      { header: 'Sr. No', field: 'leadNo' },
      { header: 'Customer Name', field: 'customerName' },
      { header: "Father's/Husband's Name", field: 'fatherHusbandName' },
      { header: 'House No.', field: 'houseNo' },
      { header: 'Floor', field: 'floor' },
      { header: 'Street/Area/Society', field: 'streetAreaSociety' },
      { header: 'City Name', field: 'cityName' },
      { header: 'State', field: 'stateName' },
      { header: 'Pincode', field: 'pincode' },
      { header: 'Mobile No.', field: 'mobile' },
      { header: 'Alternate No.', field: 'contactNo' },
      { header: 'Email', field: 'emailID' },
      { header: 'Type Of Ownership', field: 'typeOfOwnership' },
      { header: 'DD/Cheque No', field: 'orderDDChequeNo' },
      { header: 'Payment Date', field: 'paymentDate' },
      { header: 'Drawn On', field: 'drawnOn' },
      { header: 'Amount', field: 'amount' },
      { header: 'BP No.', field: 'customerID' },
      { header: 'Form No.', field: 'formNo' },


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
    // console.log('this.dashboardSearch');
    // console.log(this.dashboardSearch);
    const searchCriteria = new SearchCACriteria();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    
    setTimeout(() => {
      this.search();
    }, 600);
    
  }

  reset() {
    this.searchForm.reset();
    this.displayArr = [];
    this.filteredCustomers = [];
    this.totalRecords = 0
    this.CustomerAcquisitions = new Array<SearchSRResultModel>();
  }


  

  search() {
    this.isAllSelect = false;
    this.getbulkSelect = [];

    if (this.searchForm.valid) {
    
      this.displayModal = false;
      let data = this.searchForm.getRawValue();
      this.searchData = {
        customerName: this.filteredCustomers,
        mobile: data.mobile,
        dateFrom: data.requestFrom,
        dateTo: data.requestTo,
        status: data.status,
        take: this.paginateData[1],
        skip: this.paginateData[0],
        orderBy: this.sotingname == '' ? 'leadNo' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
      }

      this.displayArr = [];
     
      if (this.filteredCustomers != null && this.filteredCustomers.length > 0) {
        var ss = 'Customers:' + this.filteredCustomers.join(',');
        this.displayArr.push(ss);
      }
      if (data.mobile != null && data.mobile != '') {
        var ss = 'Mobile:' + data.mobile;
        this.displayArr.push(ss);
      }
     

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
      
      if (data.status != null && data.status != '') {
        var ss = 'Status:' + this.StatusArr.filter(x => x.keyName == data.status)[0].displayText;
        this.displayArr.push(ss);
      }

      this.service.Customersearch(this.searchData).subscribe((response: any) => {
        if (response && response.data && response.data.result.length > 0) {
          this.CustomerAcquisitions = response.data.result;
          this.paginateData[0] = 0;
          this.totalRecords = response.data.rowCount;
        }
        else {
          this.CustomerAcquisitions = [];
          this.paginateData[0] = 0;
          this.totalRecords = 0;
        }
      });
    } else {
      this.service.notify.showError('Please enter the criteria');
    }
    // this.searchForm.reset();
  }

  removeCustomerId(customer: any) {
    const index = this.filteredCustomers.indexOf(customer);
    if (index >= 0) {
      this.filteredCustomers.splice(index, 1);
      this.searchForm.get('customerIds')?.setValue(this.filteredCustomers);
    }
  }

  addNewSR() {
    this.routeUrl.navigate(['/customer-acquisition/customer-acquisition-add-edit/0']);
  }

  removeSearching(data: string): void {
    const index = this.displayArr.indexOf(data);
    if (index >= 0) {
      var removeData = data.split(':');
      if (removeData[0] == 'Date') {
        this.searchForm.get('requestFrom')?.setValue(null);
        this.searchForm.get('requestTo')?.setValue(null);
      }  else if (removeData[0] == 'Customers') {
        this.searchForm.get('customerIds')?.setValue(null);
        this.filteredCustomers = [];
      } else if (removeData[0] == 'Mobile') {
        this.searchForm.get('mobile')?.setValue(null);
      } else if (removeData[0] == 'Status') {
        this.searchForm.get('status')?.setValue(null);
      }
      else {
        if (removeData[0] == 'srNumbers') {

        } else if (removeData[0] == 'customerIds') {
          this.filteredCustomers = [];
        }
        this.searchForm.get(removeData[0])?.setValue(null);
      }
      this.search();
    }
  }

  addCustomerId(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.filteredCustomers.push(value);
      this.searchForm.get('customerIds')?.setValue(this.filteredCustomers);
    }
    event.chipInput!.clear();
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
      customerName: this.filteredCustomers,
      mobile: data.mobile,
      dateFrom: data.requestFrom,
      dateTo: data.requestTo,
      status: data.status,
      orderBy: this.sotingname == '' ? 'leadNo' : this.sotingname + ' ' + this.OrderBy,
      search: this.textsearch,
    }
    this.service.Customersearch(searchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.export(response.data.result);
      }
    });
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
        "Sr. No " : element.leadNo,
        "Customer Name " : element.customerName,
        "Father's/Husband's Name " : element.fatherHusbandName,
        "House No. " : element.houseNo,
        "Floor" : element.floor,
        "Street/Area/Society " : element.streetAreaSociety,
        "City Name " : element.cityName,
        "State " : element.stateName,
        "Pincode " : element.pincode,
        "Mobile No. " : element.mobile,
        "Alternate No. " : element.contactNo,
        "Email " : element.emailID,
        "Type Of Ownership " : element.typeOfOwnership,
        "DD/Cheque No " : element.orderDDChequeNo,
        "Payment Date " :element.paymentDate != null ? this.service.Moment(element.paymentDate).format("MM-DD-YYYY"):'',
        "Drawn On " : element.drawnOn != null ? this.service.Moment(element.drawnOn).format("MM-DD-YYYY"):'',
        "Amount " : element.amount,
        "BP No. " : element.customerID,
        "Form No. " : element.formNo,
      }
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 17 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 10 }  ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Customer Acquisition'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Customer Acquisition List '+Dateto+'.xlsx'); // initiate a file download in browser
  }


  searchbox(val: any) {
    console.log(val);
    this.textsearch = val;

    this.search();
  }

  Assignmanpower(name: any) {
    let url = this.oldUrl + '/Account/LoginApp?page=' + name + "&token=" + this.authService.currentUserValue.token;
    window.open(url, "_blank")
  }



}

