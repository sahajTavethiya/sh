import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MeterialService } from './meterial.service';
import { Location } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MaterialReportListModel } from 'src/app/library/core/models/report/material-report-list.model';
import { SearchSRMeterialResultModel } from 'src/app/library/core/models/service-request/search-sr-meterial-result.model';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-meterial-report',
  templateUrl: './meterial-report.component.html',
  styleUrls: ['./meterial-report.component.scss']
})
export class MeterialReportComponent implements OnInit {
  oldUrl: string = environment.oldUrl;
  searchForm: FormGroup;
  zones: Array<any>;
  getbulkSelect: Array<any> = [];
  zonesAll: Array<any> = [];
  blob: any;
  StatusArr: Array<any>;
  customers: Array<any>;
  filteredCustomers: Array<any> = [];
  displayArr: Array<any> = [];
  searchData: any;
  statusIdsName: Array<any> = [];
  zonesName: Array<any> = [];
  vendorNames:  Array<any> = [];
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
  excelSearchData : any;
  allVendors :Array<any> = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  cols: Array<any>;
  MaterialReceipt: Array<SearchSRMeterialResultModel>;
  @ViewChild('customerId') customerId: ElementRef<HTMLInputElement>;

  constructor(readonly service: MeterialService, readonly authService: AuthService,
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
    this.service.getAllVendor().subscribe((responce:any)=>{
      responce.data.forEach((element:any) => {
        this.allVendors.push({keyName:element.id,displayText : element.companyName});
      });
    });
    
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
        this.zones = lookups[this.service.constants.MasterCategories.ZoneMaster];
      }
    }));
    this.initialize();
  }

  showBasicDialog() {
    this.displayModal = true;
  }
  bindColumns() {
    this.cols = [//Lead Number
      // { header: 'Reciept Voucher', field: 'materialReceiptId' },
      // {header:'Receipt Date',field:'Receipt Date'},
      // { header: 'Item Name', field: 'Receipt Date' },
      // { header: 'Item Code', field: 'Item Code' },
      // { header: 'Unit', field: 'Unit' },
      // { header: 'Received Qty', field: 'Received Qty' },
      // { header: 'Received by', field: 'Received by' },
      
      // { header: 'Store Name', field: 'Store Name' },
       { header: 'materialReceiptId', field: 'materialReceiptId' },
      { header: 'received By Name', field: 'receivedByName' },
    { header: 'Vendor Name', field: 'companyName' },
      {header:'createdOn',field:'createdOn'},
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
    const searchCriteria = new MaterialReportListModel();
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
    this.MaterialReceipt = new Array<SearchSRMeterialResultModel>();
  }

  search() {
    this.isAllSelect = false;
    this.getbulkSelect = [];

    if (this.searchForm.valid) {
    
      this.displayModal = false;
      let data = this.searchForm.getRawValue();
      console.log("this is selected vendors",data.vendors);
      
      this.searchData = {
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],       
        fromDate: data.fromDate,
        toDate: data.toDate,
        take: this.paginateData[1],
        skip: this.paginateData[0],
        orderBy: this.sotingname == '' ? 'materialReceiptId' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
        vendorIds : data.vendors && data.vendors.length > 0 ? data.vendors : [] 

      }    
      this.excelSearchData = {
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [], 
        fromDate: data.fromDate,
        toDate: data.toDate,
        vendorIds : data.vendors && data.vendors.length > 0 ? data.vendors : [] 
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
     

      if (data.fromDate != null && data.toDate != null) {
        var ss = 'Date: Between ' + this.service.Moment(data.fromDate).format("MM-DD-YYYY") + ' To ' + this.service.Moment(data.toDate).format("MM-DD-YYYY");
        this.displayArr.push(ss);
      } else if (data.fromDate != null) {
        var ss = 'Date: From ' + this.service.Moment(data.fromDate).format("MM-DD-YYYY");
        this.displayArr.push(ss);
      } else if (data.toDate != null) {
        var ss = 'Date: To ' + this.service.Moment(data.toDate).format("MM-DD-YYYY");
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
      if (data.vendors != null && data.vendors != '') {
        this.vendorNames = [];
        this.searchData.vendorIds.forEach((keys: any, vals: any) => {
          
          console.log("this is a allvensord",this.allVendors);
          this.allVendors.forEach((x:any) => {
              if (x.keyName == keys) {
                this.vendorNames.push(x.displayText)
              }
          });
        })
        
        var ss = 'Vendors:' + this.vendorNames.join(',');
        this.displayArr.push(ss);
      }
     

      this.service.meterialsearch(this.searchData).subscribe((response: any) => {
        if (response && response.data && response.data.result.length > 0) {
          this.MaterialReceipt = response.data.result;
          this.paginateData[0] = 0;
          this.totalRecords = response.data.rowCount;
        }
        else {
          this.MaterialReceipt = [];
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
      console.log("this ia a", removeData);
         
      if (removeData[0] == 'Date') {
        this.searchForm.get('fromDate')?.setValue(null);
        this.searchForm.get('toDate')?.setValue(null);
      } 
        else if (removeData[0] == 'srNumbers') {

        } else if (removeData[0] == 'customerIds') {
          this.filteredCustomers = [];
        } else  if (removeData[0] == 'Zones'){
          this.searchForm.get('zones')?.setValue(null)
        } else if (removeData[0] == 'Vendors'){
          console.log("this is a herer");
          
          this.searchForm.get('vendors')?.setValue(null)
        }
        else{
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

  searchbox(val: any) {
    this.textsearch = val;
    this.search();
  }


  addNewSR(){

  }



  exportCSV() {
    const searchCriteria = new MaterialReportListModel();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    let data = this.searchForm.getRawValue();
    

    this.service.getAllMaterialReceiptForExcelExport(this.excelSearchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.export(response.data.result);
      }
    });
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
        'Reciept Voucher': element.materialReceiptId,
        'Receipt Date': this.service.Moment(element.createdOn).format("MM-DD-YYYY"),
        'Item Name': element.materialName,
        'Item Code': element.materialCode,
        'Unit': element.materialUnit ,
        'ReceivedQty': element.receivedQty,
        'Received by': element.receivedByName,
        'Notes': element.notes,
        'Image': element.imageName,
        'Vendor':element.companyName == null ? "N/A" :element.companyName
      //  'Vendor Name': element.vendorName,
      //  'Store Name': element.storeName,
      }
      // let singalData : any = {};
      // for(let key in element){
      //  if (element.hasOwnProperty(key)) {
      //        singalData[`${key}`] = element[key] 
      //  }
      // }
       data.push(singalData);
      //  singalData= {};
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 18 }, { wch: 21 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 30 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'MRList'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'MRList '+Dateto+'.xlsx'); // initiate a file download in browser
  }


}

