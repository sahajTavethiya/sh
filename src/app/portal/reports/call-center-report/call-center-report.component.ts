


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
 
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
import { CallCenterReportModel } from 'src/app/library/core/models/report/call-center-report.model';

@Component({
  selector: 'app-call-center-report',
  templateUrl: './call-center-report.component.html',
  styleUrls: ['./call-center-report.component.scss']
})
export class CallCenterReportComponent implements OnInit {
  oldUrl: string = environment.oldUrl;
  searchForm: FormGroup;
  apiUrl: string = environment.apiUrl;
  getbulkSelect: Array<any> = [];
  zones: Array<any>;
  serviceCategories: Array<any>;
  zonesAll: Array<any> = [];
  blob: any;
  clients: Array<any> = [];
  customers: Array<any>;
  filteredCustomers: Array<any> = [];
  filteredSRNumbers: Array<any> = [];
  displayArr: Array<any> = [];
  agentsArr: Array<any>;
  searchData: any
  statusIdsName: Array<any> = [];
  zonesName: Array<any> = [];
  agentName: Array<any> = [];
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
      this.service.constants.MasterCategories.Category,
      this.service.constants.MasterCategories.ZoneMaster];

      this.clients.push({ keyName: '', displayText: 'All Clients' });
    this.service.getLookups(categories, ((lookups: any) => {
      console.log(JSON.stringify(lookups));
      if (lookups) {
        this.clients.push(...lookups[this.service.constants.MasterCategories.ServiceForMaster]);
        this.zones = lookups[this.service.constants.MasterCategories.ZoneMaster];
        this.serviceCategories = lookups[this.service.constants.MasterCategories.Category];
      }
    }));

    this.service.GetUserByRoleId().subscribe((data: any) => {
      if (data.status == "success") {
        this.agentsArr = data.data
      }
      console.log(data);


    });
    
    this.initialize();
  }

  showBasicDialog() {
    this.displayModal = true;
  }



  bindColumns() {
    this.cols = [
      { header: 'AgentID', field: 'agentID' },
      { header: 'PhoneNo', field: 'phoneNo' },
      { header: 'CustomerId', field: 'customerId' },
      { header: 'Status', field: 'status' },
      { header: 'CallType', field: 'callType' },
      { header: 'CallTime', field: 'callTime' },
      { header: 'Duration', field: 'callDuration' },
      { header: 'RecordingFile', field: 'recordingFileName' },
      { header: 'EnquiryDate', field: 'enquiryDate' },
      { header: 'SRNumber', field: 'srNumber' },
      { header: 'SRStatus', field: 'srStatus' },
      { header: 'HouseNo', field: 'houseNo' },
      { header: 'Society', field: 'society' },
      { header: 'Area', field: 'area' },
      { header: 'CityName', field: 'cityName' },
      { header: 'Calling Remark', field: 'description' }



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
    const searchCriteria = new CallCenterReportModel();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    // this.searchForm.patchValue({requestFrom: moment(Date.now() - 1 * 24 * 3600 * 1000).format('YYYY-MM-DD')})
    // this.searchForm.patchValue({requestTo: moment(Date.now()).format('YYYY-MM-DD')})
    // this.search();
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
        fromDate: data.requestFrom,
        toDate: data.requestTo,
        srNo: this.filteredSRNumbers,
        zones: data.zones && data.zones.length > 0 ? data.zones : [],
        serviceForId:data.serviceForId,
        customerIds: this.filteredCustomers,
        serviceCategoryID:data.categoryId,
        agentIds:data.agentIds && data.agentIds.length > 0 ? data.agentIds : [],
        skip: this.paginateData[0],
        take: this.paginateData[1],
        OrderBy: this.sotingname == '' ? 'agentID' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
        
      }
      console.log(this.searchData);
      this.displayArr = [];
      if (this.filteredSRNumbers != null && this.filteredSRNumbers.length > 0) {
        var ss = 'Service Request Number:' + this.filteredSRNumbers.join(',');
        this.displayArr.push(ss);
      }
      if (this.filteredCustomers != null && this.filteredCustomers.length > 0) {
        var ss = 'Customers:' + this.filteredCustomers.join(',');
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

      if (data.agentIds != null && data.agentIds != '') {
        this.agentName = [];
        this.searchData.agentIds.forEach((keys: any, vals: any) => {
          this.agentsArr.forEach(x => {
            console.log('x',x)
            if (x.id.toString().includes(keys)) {
              if (x.id === keys) {
                this.agentName.push(x.firstName)
              }
            }
          });
        })
        var ss = 'Agents:' + this.agentName.join(',');
        this.displayArr.push(ss);
      }
      

      if (data.categoryId != null && data.categoryId != '') {
        var ss = 'ServiceCategories:' + this.serviceCategories.filter(x => x.keyName == data.categoryId)[0].displayText;
        this.displayArr.push(ss);
      }

    
      
      this.service.callCenter(this.searchData).subscribe((response: any) => {
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
      } else if (removeData[0] == 'Zones') {
        this.searchForm.get('zones')?.setValue(null);
      } else if (removeData[0] == 'Agents') {
        this.searchForm.get('agentIds')?.setValue(null);
      } else if (removeData[0] == 'Clients') {
        this.searchForm.get('serviceForId')?.setValue(null);
      } else if (removeData[0] == 'ServiceCategories') {
        this.searchForm.get('categoryId')?.setValue(null);
      }


      else {
        if (removeData[0] == 'srNumbers') {
          this.filteredSRNumbers = [];
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

  removeCustomerId(customer: any) {
    const index = this.filteredCustomers.indexOf(customer);
    if (index >= 0) {
      this.filteredCustomers.splice(index, 1);
      this.searchForm.get('customerIds')?.setValue(this.filteredCustomers);
    }
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


      fromDate: data.requestFrom,
        toDate: data.requestTo,
        srNo: this.filteredSRNumbers,
        zones: data.zones && data.zones.length > 0 ? data.zones : [],
        serviceForId:data.serviceForId,
        customerIds: this.filteredCustomers,
        serviceCategoryID:data.categoryId,
        agentIds:data.agentIds && data.agentIds.length > 0 ? data.agentIds : [],
        search: this.textsearch,
    }


    this.service.callCenter(searchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.export(response.data.result);
      }
    });
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
      'AgentID' : element.agentID,
      'PhoneNo' : element.phoneNo,
      'CustomerId' : element.customerId,
      'Status' : element.status,
      'CallType' : element.callType,
      'CallTime' : element.callTime != null ? this.service.Moment(element.callTime).format("MM-DD-YYYY h:mm a"):'',
      'Duration' : element.callDuration !=null ?(element.callDuration.hours+':'+ element.callDuration.minutes+':'+ element.callDuration.seconds):'',
      'RecordingFile' : element.recordingFileName,
      'EnquiryDate' :  element.enquiryDate != null ? this.service.Moment(element.enquiryDate).format("MM-DD-YYYY"):'',
      'SRNumber' : element.srNumber,
      'SRStatus' : element.srStatus,
      'HouseNo' : element.houseNo,
      'Society' : element.society,
      'Area' : element.area,
      'CityName' : element.cityName,
      'Calling Remark' : element.description

      }
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 },{ wch: 15 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 }, { wch: 20 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Call Center Report'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Call Center Report '+Dateto+'.xlsx'); // initiate a file download in browser
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

  downloadCallRecording(dataArr:any){
console.log(dataArr);
this.service.downloadCallRecording(dataArr.customerId,dataArr.srNumber,dataArr.phoneNo,dataArr.callType,dataArr.callTime,dataArr.recordingFileName).subscribe((data:any) => {
      
  console.log(data);
  this.blob = new Blob([data], {type: 'application/mp3'});

  var downloadURL = window.URL.createObjectURL(this.blob);
  var link = document.createElement('a');
  link.href = downloadURL;
  link.download =dataArr.recordingFileName;
  link.click();

},
(error) => {
  this.service.notify.showError('File Not Found');
  // console.log(error);
});
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




