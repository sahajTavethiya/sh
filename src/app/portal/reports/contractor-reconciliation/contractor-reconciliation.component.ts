
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MaterialReportIssueListModel } from 'src/app/library/core/models/report/material-report-issue.model';
import { LazyLoadEvent } from 'primeng/api';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { stockReportModel } from 'src/app/library/core/models/report/stock-report.model';
import { ContractorReconciliationServiceService } from './contractor-reconciliation-service.service';
import { ContractorReconciliationModel } from 'src/app/library/core/models/report/reConciliationReportModel';
@Component({
  selector: 'app-contractor-reconciliation',
  templateUrl: './contractor-reconciliation.component.html',
  styleUrls: ['./contractor-reconciliation.component.scss']
})
export class ContractorReconciliationComponent implements OnInit {

  constructor(readonly service: ContractorReconciliationServiceService , readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,
    private routeUrl: Router ) { }
  materialReceiptId : any

  zones: Array<any>;
  searchForm: FormGroup;
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
  searchObject : any = {} // for exel 
  validationMsg : string
  showMsg : Boolean = false;
  employeeList : any;
  employeeNames: { displayText: any,keyName:any; }[] = []
  cols = [    
    { header: 'id', field: 'id' },
    {header:'materialName',field:'materialName'},
    { header: 'price', field: 'price' },
    { header: 'receivedQty', field: 'receivedQty' },
    { header: 'qty', field: 'qty' },
    { header: 'stock', field: 'stock' },
  ]
  
  Material_Details  :any = []
  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.bindColumns();
    this.bindDropdowns();
  }
 
  initialize() {
    const searchCriteria = new ContractorReconciliationModel();
    console.log(searchCriteria);
    
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    
    setTimeout(() => {
     // this.search();
    }, 600);
    
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
    this.service.getAllEmployees().subscribe((response: any) => {
      console.log(response.data[0].displayText); 
      this.employeeList = response.data;
      response.data.forEach((element:any,index:any)=>{
        this.employeeNames.push({displayText : element.displayText,keyName: parseInt(element.keyName)})
      });
      this.showMsg = false;
      
  });
    this.initialize();
  }

  bindColumns() {
    this.cols = [//Lead Number
    { header: 'sr.no', field: 'id' },
    {header:'Material Name',field:'MaterialName'},
    {header:'MaterialCode',field:'MaterialCode'},
    {header:'Unit',field:'Unit'},
  //  { header: 'Price', field: 'price' },
    { header: 'Qty Issued (A)', field: 'IssuesQty' },
    { header: 'Consumed (B)', field: 'ConsumeQty' },
    { header: 'In-stock (A-B)', field: 'InStockQty' },
    ];
  }
  onZoneChange(){
    let data = this.searchForm.getRawValue();
    let zoneIds1= parseInt( data.zones && data.zones.length > 0 ? data.zones : []);
    // let reqData ={
    //   userTypeId: 2,
    //   zoneId: zoneIds1      
    // }

  }
  onEmployeeChange(){
    let data = this.searchForm.getRawValue();
    if(!data.zones){
   //   this.validationMsg = "please select zone";
  //    this.showMsg = true;
    }
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
  searchbox(val: any) {
    this.textsearch = val;
    this.search();
  }
  search(){
    
    this.isAllSelect = false;
    this.getbulkSelect = [];

    if (this.searchForm.valid) {
      
      let data = this.searchForm.getRawValue();
      this.searchData = {
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        FromDate: data.fromDate,
        ToDate: data.toDate,        
        Take: this.paginateData[1],
        Skip: this.paginateData[0],
        OrderBy: this.sotingname == '' ? 'issuedByName ' : this.sotingname + ' ' + this.OrderBy,
       // search: this.textsearch,
        ManpowerID : data.employeeName  
      }

      this.searchObject = {
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        fromDate: data.fromDate,
        toDate: data.toDate,
        take: 5000,
        skip: 0,
        ManpowerID : data.employeeName 
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
      if(data.employeeName){
        var index = this.employeeNames.findIndex(x => x.keyName == data.employeeName )
        var ss = 'Employee:' + this.employeeNames[index].displayText;        
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

      if(this.searchData.ManpowerID != null){
        this.displayModal = false;
        this.service.getReconciliationReport(this.searchData).subscribe((response: any) => {
          if (response && response.data && response.data.result.length > 0) {
            this.Material_Details = response.data.result;
            this.paginateData[0] = 0;
            this.totalRecords = response.data.rowCount;
          }
          else {
            this.Material_Details = [];
            this.paginateData[0] = 0;
            this.totalRecords = 0;
          }
       });
      }else{
        this.validationMsg = "please select employee";
        this.showMsg = true;
      }

    } else {
      this.service.notify.showError('Please enter the criteria');
    }
  }
  showBasicDialog(){
    this.displayModal = true;
  }
  removeSearching(data: string): void {
    const index = this.displayArr.indexOf(data);
    if (index >= 0) {

      var removeData = data.split(':');  
          
      if (removeData[0] == 'Date') {
        this.searchForm.get('fromDate')?.setValue(null);
        this.searchForm.get('toDate')?.setValue(null);
      }else if (removeData[0] == 'srNumbers') {

        } 
        else if (removeData[0] == 'customerIds') {
          this.filteredCustomers = [];
        } else if (removeData[0] == 'Zones'){
          this.searchForm.get('zones')?.setValue(null)
        }else if(removeData[0] == 'Employee'){
          this.searchForm.get('employeeName')?.setValue(null)
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
  reset(){
    this.searchForm.reset();
    this.displayArr = [];
    this.filteredCustomers = [];
    this.totalRecords = 0
    this.Material_Details = new Array<stockReportModel>();
  }
  exportCSV() {
    let data = this.searchForm.getRawValue();
    this.service.getReconciliationReport(this.searchObject).subscribe((response: any) => {
      if (response && response.data && response.data.result?.length > 0) {
        console.log(response.data.result.length);
        
        this.export(response.data.result);
      }
    });
  }
  public export(json: any[]) {

    let data: any = [];
    let i =1;
    json.forEach(element => {
      let singalData = {
        'Sr.No.': i,
        'Material Description': element.materialName,
        'Item Code': element.id,
         'Unit': element.unit ,
        'Qty Issued (A)': element.issuesQty,
        'Consumed (B)': element.consumeQty,
        'In-stock (A-B)':element.inStockQty,
        //'Price':element.price,
       // 'Received by': element.receivedByName,
      }

      i++;
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 25 }, { wch: 21 }, { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 20 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Material Stock'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Material Stock'+Dateto+'.xlsx'); // initiate a file download in browser
  }

}
