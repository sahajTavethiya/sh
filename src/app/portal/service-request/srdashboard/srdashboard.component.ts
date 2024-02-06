import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SearchSRCriteria } from 'src/app/library/core/models/service-request/search-sr-criteria.model';
import { SearchSRResultModel } from 'src/app/library/core/models/service-request/search-sr-result.model';
import { SRDashboardService } from './srdashboard.service';
 
import { Location } from '@angular/common';


import { MatChipInputEvent } from '@angular/material/chips';
import { LazyLoadEvent } from 'primeng/api';
import { SrListUpdateComponent } from './sr-list-update/sr-list-update.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AssignManpowerBulkComponent } from './assign-manpower-bulk/assign-manpower-bulk.component';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as moment from 'moment';

@Component({
  selector: 'app-srdashboard',
  templateUrl: './srdashboard.component.html',
  styleUrls: ['./srdashboard.component.scss']
})

export class SRDashboardComponent implements OnInit {
  oldUrl: string = environment.oldUrl;
  searchForm: FormGroup;

  getbulkSelect: Array<any> = [];
  serviceNames: Array<any>;
  zones: Array<any>;
  zonesAll: Array<any> = [];
  blob: any;
  priorities: Array<any>;
  statuses: Array<any>;
  customers: Array<any>;
  filteredCustomers: Array<any> = [];
  filteredSRNumbers: Array<any> = [];
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
  serviceRequests: Array<SearchSRResultModel>;
  @ViewChild('customerId') customerId: ElementRef<HTMLInputElement>;

  constructor(readonly service: SRDashboardService, readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,private location:Location) {

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
      this.service.constants.MasterCategories.ZoneMaster];

    this.service.getLookups(categories, ((lookups: any) => {
      console.log(JSON.stringify(lookups));
      if (lookups) {
        this.priorities = lookups[this.service.constants.LookupCategories.ServicePriority];
        this.serviceNames = lookups[this.service.constants.MasterCategories.ServiceMaster];
        this.statuses = lookups[this.service.constants.MasterCategories.ServiceStageMaster];
        this.zones = lookups[this.service.constants.MasterCategories.ZoneMaster];
      }
      if( this.statuses.findIndex(x =>x.keyName =='27')){
        this.statuses.splice(this.statuses.findIndex(x =>x.keyName =='27'), 1);
       }
    }));

    this.initialize();
  }

  showBasicDialog() {
    this.displayModal = true;
  }



  bindColumns() {
    this.cols = [
      { header: 'SR Number', field: 'enquiryId' },
      { header: 'Customer ID', field: 'customerId' },
      { header: 'Mobile Number', field: 'mobileNo' },
      { header: 'Alt. Number', field: 'contactNo' },
      { header: 'House No.', field: 'houseNo' },
      { header: 'Society', field: 'society' },
      { header: 'Area', field: 'area' },
      { header: 'Status', field: 'enquiryStatusId' },
      { header: 'Calling Remark', field: 'description' },
      { header: 'Visit Remark', field: 'delayReason' },
      { header: 'Enquiry Date', field: 'enquiryDate' },
      { header: 'Preffered Date', field: 'preferredDate' },
      { header: 'Gas Status', field: 'planName' },
      { header: 'Priority', field: 'priorityName' }
      // { header: 'Action', field: 'action' },
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
    console.log('this.dashboardSearch');
    console.log(this.dashboardSearch);
    const searchCriteria = new SearchSRCriteria();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    if(this.dashboardSearch.statusIds || this.dashboardSearch.statusIds == null){
      this.searchForm.get('statusIds')?.setValue(this.dashboardSearch.statusIds);
      this.searchForm.get('zones')?.setValue(this.dashboardSearch.zones);
      this.searchForm.get('serviceIds')?.setValue(this.dashboardSearch.serviceIds);
      this.searchForm.get('serviceForId')?.setValue(this.dashboardSearch.serviceForId);
      
      if(this.dashboardSearch.requestFrom != ''){
        this.searchForm.get('requestFrom')?.setValue(this.dashboardSearch.requestFrom);
        this.searchForm.get('requestTo')?.setValue(this.dashboardSearch.requestTo);
      }
      
    }
    setTimeout(() => {
      this.search();
    }, 600);
    
  }

  reset() {
    this.searchForm.reset();
    this.displayArr = [];
    this.filteredCustomers = [];
    this.filteredSRNumbers = [];
    this.totalRecords = 0
    this.serviceRequests = new Array<SearchSRResultModel>();
  }

  callPhone(enquiryId: any, mobileNo: any) {
    this.service.callPhone(enquiryId).subscribe((response: any) => {
      console.log(response);
      if (response.status == "success") {

        let data = {
          k_number: "+919513309915",
        //  agent_number: "+91" + this.authService.currentUserValue.mobile,
          customer_number: "+91" + mobileNo,
          caller_id: "+918035390130",
          additional_params: { SRNo: response.data }
        }
        this.service.makecall(data).subscribe((response1: any) => {
          console.log(response1);
          this.service.notify.showSuccess(response1.success.message);
        });
      }
    });
  }

  srListUpdate(enquiryData: any, type: any) {
    if (enquiryData.length != 0) {
      let data = [enquiryData];
      // data.push(enquiryData);
       
      const dialogRef = this.dialog.open(SrListUpdateComponent, {
        data: { enquiryData: data, type: type },
        width: '800px',
        // height: '500px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.paginateData[0] = this.paginateDataedit[0];
        this.paginateData[1] = this.paginateDataedit[1];
        this.search();

      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
  }

  search() {
    this.isAllSelect = false;
    // console.log(this.zones);
    this.getbulkSelect = [];

    if (this.searchForm.valid) {
      console.log(this.statuses);
    
      this.displayModal = false;
      let data = this.searchForm.getRawValue();
      console.log(data);
      this.searchData = {
        customerIds: this.filteredCustomers,
        srNumbers: this.filteredSRNumbers,
        mobile: data.mobile,
        priority: data.priority,
        requestFrom: data.requestFrom,
        requestTo: data.requestTo,
        serviceIds: data.serviceIds && data.serviceIds.length > 0 ? data.serviceIds : [],
        statusIds: data.statusIds && data.statusIds.length > 0 ? data.statusIds : [],
        zones: data.zones && data.zones.length > 0 ? data.zones : [],
        take: this.paginateData[1],
        skip: this.paginateData[0],
        OrderBy: this.sotingname == '' ? 'enquiryId' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
        serviceForId:data.serviceForId
      }

      this.displayArr = [];
      if (this.filteredSRNumbers != null && this.filteredSRNumbers.length > 0) {
        var ss = 'Service Request Number:' + this.filteredSRNumbers.join(',');
        this.displayArr.push(ss);
      }
      if (this.filteredCustomers != null && this.filteredCustomers.length > 0) {
        var ss = 'Customers:' + this.filteredCustomers.join(',');
        this.displayArr.push(ss);
      }
      if (data.mobile != null && data.mobile != '') {
        var ss = 'Mobile:' + data.mobile;
        this.displayArr.push(ss);
      }
      console.log(data.serviceIds);
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

      
      // if (data.serviceIds != null && data.serviceIds != '') {
      //   this.serviceIdsName = [];
      //   this.serviceNames.forEach(x => {
      //     console.log(x.keyName);
      //     console.log(data.serviceIds);
      //     if (x.keyName.includes(data.serviceIds)) {
      //       console.log('data.serviceIds');
      //       if (x.keyName == data.serviceIds) {
      //         console.log('data.serviceIds');
      //         this.serviceIdsName.push(x.displayText)
      //       }
      //     }

      //   });
        
      //   console.log(this.serviceNames);
      //   // })
      //   var ss = 'Service Name:' + this.serviceIdsName.join(',');
      //   this.displayArr.push(ss);
      // }
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
      if (data.priority != null && data.priority != '') {
        var ss = 'Priority:' + this.priorities.filter(x => x.keyName == data.priority)[0].displayText;
        this.displayArr.push(ss);
      }
      if (data.statusIds != null && data.statusIds != '') {
        this.statusIdsName = [];
        this.searchData.statusIds.forEach((keys: any, vals: any) => {
          this.statuses.forEach(x => {
            if (x.keyName.includes(keys)) {
              if (x.keyName === keys) {
                this.statusIdsName.push(x.displayText)
              }
            }
          });
        })
        var ss = 'Status:' + this.statusIdsName.join(',');
        this.displayArr.push(ss);
      }

      this.service.search(this.searchData).subscribe((response: any) => {
        if (response && response.data && response.data.searchSRResult.length > 0) {
          this.serviceRequests = response.data.searchSRResult;
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
  generatePDFs() {
    this.service.BulkGeneratePDF().subscribe((data: any) => {
      if (data.status == "success") {
        this.service.notify.showSuccess("PDF generated successfully");
      }
      console.log(data);


    });
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
      } else if (removeData[0] == 'Mobile') {
        this.searchForm.get('mobile')?.setValue(null);
      } else if (removeData[0] == 'Service Name') {
        this.searchForm.get('serviceIds')?.setValue(null);
      } else if (removeData[0] == 'Zones') {
        this.searchForm.get('zones')?.setValue(null);
      } else if (removeData[0] == 'Priority') {
        this.searchForm.get('priority')?.setValue(null);
      } else if (removeData[0] == 'Status') {
        this.searchForm.get('statusIds')?.setValue(null);
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
      srNumbers: this.filteredSRNumbers,
      mobile: data.mobile,
      priority: data.priority,
      requestFrom: data.requestFrom,
      requestTo: data.requestTo,
      serviceIds: data.serviceIds && data.serviceIds.length > 0 ? data.serviceIds : [],
      statusIds: data.statusIds && data.statusIds.length > 0 ? data.statusIds : [],
      zones: data.zones && data.zones.length > 0 ? data.zones : [],
      serviceForId: data.serviceForId
    }
    this.service.search(searchData).subscribe((response: any) => {
      if (response && response.data && response.data.searchSRResult.length > 0) {
        this.export(response.data.searchSRResult);
      }
    });
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
        'SR Number': element.enquiryId,
        'Customer ID': element.customerId,
        'Mobile Number': element.mobileNo,
        'Alt. Number': element.contactNo,
        'House No.': element.houseNo,
        'Society': element.society,
        'Area': element.area,
        'Status': element.enquiryStatus,
        'Calling Remark': element.description,
        'Visit remark': element.delayReason,
        'Enquiry Date': element.enquiryDate != null ? this.service.Moment(element.enquiryDate).format("MM-DD-YYYY") : '',
        'Preferred Date': element.preferredDate != null ? this.service.Moment(element.preferredDate).format("MM-DD-YYYY") : '',
        'Gas Status': element.planName,
        'Priority': element.priorityName
      }
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 30 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'SRList'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'SRList '+Dateto+'.xlsx'); // initiate a file download in browser
  }


  onChkChildChange(ob: MatCheckboxChange, index: any) {
    // console.log(ob.checked);
    // console.log(index);
    // console.log(this.data.getSRAvailableManpower);


    if (ob.checked == true) {
      this.getbulkSelect.push(this.serviceRequests.filter(x => x.enquiryId == index)[0])
    } else {
      this.getbulkSelect.forEach((value, ind) => {
        // console.log(value.enquiryId);
        if (value.enquiryId == index) {
          this.getbulkSelect.splice(ind, 1);
        }
      });
    }
    if (this.getbulkSelect.length == this.serviceRequests.length) {
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
          element.isSelect = true;
          this.getbulkSelect.push(element);
        });
      }, 10);

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

  Bulk_Upload(type: any) {
    if (this.getbulkSelect.length != 0) {
      const dialogRef = this.dialog.open(SrListUpdateComponent, {
        data: { enquiryData: this.getbulkSelect, type: type },
        width: '800px',
        // height: '500px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.paginateData[0] = this.paginateDataedit[0];
        this.paginateData[1] = this.paginateDataedit[1];
        this.search();

      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
  }

  AssignmanpowerBulk(type: any) {

    if (this.getbulkSelect.length != 0) {
      let isServiceId = true;
      let isCityId = true;
      let isEnquiryStatusId = true;
      let isPreferredDate = true;
      
      
        let valServiceId = this.getbulkSelect[0].serviceId;
        let valCityId = this.getbulkSelect[0].cityId;
        let valEnquiryStatusIdNonWorkable = 4;
        let valEnquiryStatusIdQueue = 6;
 
        this.getbulkSelect.forEach(element => {
          
            isServiceId = valServiceId != element.serviceId ?false:true;
            isCityId = valCityId != element.cityId ?false:true;
          
          if(valEnquiryStatusIdNonWorkable != element.enquiryStatusId && valEnquiryStatusIdQueue != element.enquiryStatusId){
              isEnquiryStatusId = false;
          }
          if(element.preferredDate == null){
            isPreferredDate = false;
          }
        });
      

      console.log(isServiceId);
      console.log(isCityId);
      console.log(isEnquiryStatusId);

      if(isServiceId && isCityId && isEnquiryStatusId && isPreferredDate){
        const dialogRef = this.dialog.open(AssignManpowerBulkComponent, {
          data: { enquiryData: this.getbulkSelect, type: type },
          // width: '800px',
          // height: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          this.paginateData[0] = this.paginateDataedit[0];
          this.paginateData[1] = this.paginateDataedit[1];
          this.search();
  
        });
      }else{
        if(!isPreferredDate){
          this.service.notify.showError('Please Enter Preferred Date in SRs');
        }else
        if(!isServiceId){
          this.service.notify.showError('Please select Single ServiceType Srs');
        }else if(!isCityId){
          this.service.notify.showError('Please select Single Zone Srs');
        }else if(!isEnquiryStatusId){
          this.service.notify.showError('Please check EnquiryStatus of Selected Srs');
        }
        
      }
      
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      
      //   }
    }
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

