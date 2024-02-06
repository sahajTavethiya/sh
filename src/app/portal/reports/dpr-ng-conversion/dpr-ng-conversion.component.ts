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
import { PETrackerModel } from 'src/app/library/core/models/report/pe-tracker.model';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as moment from 'moment';

@Component({
  selector: 'app-dpr-ng-conversion',
  templateUrl: './dpr-ng-conversion.component.html',
  styleUrls: ['./dpr-ng-conversion.component.scss']
})

export class DPRNGConversionComponent implements OnInit {
  oldUrl: string = environment.oldUrl;
  searchForm: FormGroup;
  apiUrl: string = environment.apiUrl;
  getbulkSelect: Array<any> = [];
  zones: Array<any>;
  zonesAll: Array<any> = [];
  blob: any;
  clients: Array<any> = [];
  customers: Array<any>;
  filteredCustomers: Array<any> = [];
  filteredSRNumbers: Array<any> = [];
  displayArr: Array<any> = [];
  searchData: any
  statusIdsName: Array<any> = [];
  zonesName: Array<any> = [];
  clientsName: Array<any> = [];
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


  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  cols: Array<any>;
  serviceRequests: Array<PETrackerModel>;
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
      this.service.constants.MasterCategories.ZoneMaster];

      this.clients.push({ keyName: '', displayText: 'All Clients' });
    this.service.getLookups(categories, ((lookups: any) => {
      console.log(JSON.stringify(lookups));
      if (lookups) {
        this.clients.push(...lookups[this.service.constants.MasterCategories.ServiceForMaster]);
        this.zones = lookups[this.service.constants.MasterCategories.ZoneMaster];
      }
    }));
    this.initialize();
  }

  showBasicDialog() {
    this.displayModal = true;
  }



  bindColumns() {
    this.cols = [
      { header: 'SR No', field: 'id' },
      // { header: 'JMR', field: '' },
      { header: 'Enquiry Completion Date', field: 'completionDate' },
      { header: 'Zone', field: 'zone' },
      { header: 'Control Room', field: 'controlRoom' },
      { header: 'Society', field: 'society' },
      { header: 'House No', field: 'houseNo' },
      { header: 'CustomerID', field: 'customerID' },
      { header: 'Meter No', field: 'meterNo' },
      { header: 'Gas Start Date', field: 'gasStartDate' },
      { header: 'JMR Reading', field: 'jmrReading' },
      { header: 'Burner Details', field: 'burnerDetails' },
      { header: 'CompletedBy', field: 'completedBy' },
      { header: 'Meter Image', field: 'meterImage' },
      { header: 'Installation Image', field: 'applianceImage' },
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
    const searchCriteria = new SearchSRCriteria();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    this.searchForm.patchValue({requestFrom: moment(Date.now() - 1 * 24 * 3600 * 1000).format('YYYY-MM-DD')})
    this.searchForm.patchValue({requestTo: moment(Date.now()).format('YYYY-MM-DD')})
    this.search();
  }

  reset() {
    this.searchForm.reset();
    this.displayArr = [];
    this.filteredCustomers = [];
    this.filteredSRNumbers = [];
    this.totalRecords = 0
    this.serviceRequests = new Array<PETrackerModel>();
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
        customerIds: this.filteredCustomers,
        fromDate: data.requestFrom,
        toDate: data.requestTo,
        zones: data.zones && data.zones.length > 0 ? data.zones : [],
        serviceId: 1,
        take: this.paginateData[1],
        skip: this.paginateData[0],
        OrderBy: this.sotingname == '' ? 'id' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
        serviceForId:data.serviceForId !='' ? data.serviceForId  : null
      }
      console.log(this.searchData);
      this.displayArr = [];
      if (this.filteredCustomers != null && this.filteredCustomers.length > 0) {
        var ss = 'Customers:' + this.filteredCustomers.join(',');
        this.displayArr.push(ss);
      }
      console.log(data.serviceIds);
      
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
      if (data.zones != null && data.zones != '') {
        this.zonesName = [];
        this.searchData.zones.forEach((keys: any, vals: any) => {
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
      if (data.serviceForId != null && data.serviceForId != '') {
        var ss = 'Clients:' + this.clients.filter(x => x.keyName == data.serviceForId)[0].displayText;
        this.displayArr.push(ss);
      }

      this.service.pe_tracker(this.searchData).subscribe((response: any) => {
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

  removeCustomerId(customer: any) {
    const index = this.filteredCustomers.indexOf(customer);
    if (index >= 0) {
      this.filteredCustomers.splice(index, 1);
      this.searchForm.get('customerIds')?.setValue(this.filteredCustomers);
    }
  }

  addNewSR() {
    let url = this.oldUrl + '/Account/LoginApp?page=CreateSR&token=' + this.authService.currentUserValue.token;
    window.open(url, "_blank");
  }

  removeSearching(data: string): void {
    const index = this.displayArr.indexOf(data);
    if (index >= 0) {
      var removeData = data.split(':');
      if (removeData[0] == 'Date') {
        this.searchForm.get('requestFrom')?.setValue(null);
        this.searchForm.get('requestTo')?.setValue(null);
      } else if (removeData[0] == 'Service Request Number') {
        this.searchForm.get('srNumbers')?.setValue(null);
        this.filteredSRNumbers = [];
      } else if (removeData[0] == 'Customers') {
        this.searchForm.get('customerIds')?.setValue(null);
        this.filteredCustomers = [];
      } else if (removeData[0] == 'Service Name') {
        this.searchForm.get('serviceIds')?.setValue(null);
      } else if (removeData[0] == 'Zones') {
        this.searchForm.get('zones')?.setValue(null);
      } else if (removeData[0] == 'Clients') {
        this.searchForm.get('serviceForId')?.setValue(null);
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.filteredSRNumbers.push(value);
      // this.searchForm.get('srNumbers')?.setValue(this.filteredSRNumbers.map(x => x));
    }
    event.chipInput!.clear();
  }

  removeSR(srNumber: any) {
    const index = this.filteredSRNumbers.indexOf(srNumber);
    if (index >= 0) {
      this.filteredSRNumbers.splice(index, 1);
      // this.searchForm.get('srNumbers')?.setValue(this.filteredSRNumbers.map(x => x));
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
      customerIds: this.filteredCustomers,
      fromDate: data.requestFrom,
      toDate: data.requestTo,
      zones: data.zones && data.zones.length > 0 ? data.zones : [],
      serviceId: 1,
      search: this.textsearch,
      serviceForId:data.serviceForId !='' ? data.serviceForId  : null
    }


    this.service.pe_tracker(searchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.export(response.data.result);
      }
    });
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
        'SR No': element.id,
        'JMR': element.pdfFile,
        'Enquiry Completion Date': element.completionDate != null ? this.service.Moment(element.completionDate).format("MM-DD-YYYY") : '',
        'Zone': element.zone,
        'Control Room': element.controlRoom,
        'Society': element.society,
        'House No': element.houseNo,
        'CustomerID': element.customerID,
        'Meter No.': element.meterNo,
        'Gas Start Date': element.gasStartDate != null ? this.service.Moment(element.gasStartDate).format("MM-DD-YYYY") : '',
        'JMR Reading': element.jmrReading ,
        'Burner Details': element.burnerDetails,
        'CompletedBy': element.completedBy,
        'Meter Image': element.meterImage,
        'Installation Image': element.applianceImage
      }
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 30 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'NG Tracking Report'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'NG Tracking Report '+Dateto+'.xlsx'); // initiate a file download in browser
  }


  onChkChildChange(ob: MatCheckboxChange, index: any) {
console.log(this.serviceRequests);
    if (ob.checked == true) {
      this.getbulkSelect.push(this.serviceRequests.filter(x => x.id == index)[0])
    } else {
      this.getbulkSelect.forEach((value, ind) => {
        // console.log(value.enquiryId);
        if (value.id == index) {
          this.getbulkSelect.splice(ind, 1);
        }
      });
    }
    let cout = 0
    this.serviceRequests.forEach(element => {
      if(element.pdfFile != ''){
        cout = cout +1;
      }          
    });
    if (this.getbulkSelect.length == cout) {
      this.isAllSelect = true;
    } else {
      this.isAllSelect = false;
    }

    console.log(this.getbulkSelect);
    console.log(this.isAllSelect);
  }

  onChkChildChange1(ob: MatCheckboxChange) {
    console.log(ob.checked);


    if (ob.checked == true) {
      this.getbulkSelect = [];
      this.isAllSelect = true;
      this.serviceRequests.forEach(element => {
        element.isSelect = false;
        this.getbulkSelect.pop();
      });
      setTimeout(() => {
        this.serviceRequests.forEach(element => {
          if(element.pdfFile != ''){
            element.isSelect = true;
            this.getbulkSelect.push(element);
          }          
        });
      }, 20);

    } else {
      this.isAllSelect = false;
      this.serviceRequests.forEach(element => {
        element.isSelect = false;
      });
      this.getbulkSelect = [];
    }
    console.log(this.getbulkSelect);
    console.log(this.serviceRequests);
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
          this.blob = new Blob([data], {type: 'application/zip'});
    
          var downloadURL = window.URL.createObjectURL(this.blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download ="DPR_NG_ConversionReports";
          link.click();
        }else{
          this.service.notify.showError('File Not Found');
        }
        
      
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
  }

  viewImage(name:any,id:any){

    this.service.viewImage(id,name).subscribe((data:any) => {
      
      console.log(data);
      this.blob = new Blob([data], {type: 'application/jpg'});
    
      var downloadURL = window.URL.createObjectURL(this.blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download =name;
      link.click();
    
    },
    (error) => {
      this.service.notify.showError('File Not Found');
      // console.log(error);
    });
    
    // let url  = this.apiUrl+"/servicerequest/downloadDocument?type=Service&enquiryId="+this.data.requestId+"&filename="+name;
    // window.open(url, "_blank");

  }


}



