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
import { StockReportServiceService } from './stock-report-service.service';
import { stockReportModel } from 'src/app/library/core/models/report/stock-report.model';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent implements OnInit {

  constructor(readonly service: StockReportServiceService , readonly authService: AuthService,
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

  ItemList : any;
  ItemNames: { displayText: any,keyName:any; }[] = []
  MaterialCategoryNames :{ displayText: any,keyName:any; }[] = []
  MaterialCategory:any;
  searchObject : any = {} // for exel 
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
    const searchCriteria = new stockReportModel();
    console.log(searchCriteria);
    
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    
    setTimeout(() => {
      this.search();
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
    this.initialize();
  }

  bindColumns() {
    this.cols = [//Lead Number
    { header: 'MaterialCode', field: 'id' },
    {header:'Material Name',field:'materialName'},
    {header:'Unit',field:'MaterialUnit'},
  //  { header: 'Price', field: 'price' },
    { header: 'Received Qty', field: 'receivedQty' },
    { header: 'Issued Qty', field: 'qty' },
    { header: 'Stock', field: 'stock' },
    ];
    this.service.GetAllMaterial().subscribe((response: any) => {
      console.log(response); 
      this.ItemList = response.data.table;
      response.data.table.forEach((element:any,index:any)=>{
        this.ItemNames.push({displayText : element.materialName,keyName: parseInt(element.id)})
      }); 
    });
    this.service.viewServiceMaster().subscribe((response: any) => {
      //debugger;
        if (response && response.data!=null) {        
      //  debugger;
      this.MaterialCategory = response.data;
      response.data.forEach((element:any,index:any)=>{
        this.MaterialCategoryNames.push({displayText : element.categoryName,keyName: parseInt(element.id)})
      });      
        }        
      });      
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
      this.displayModal = false;
      let data = this.searchForm.getRawValue();
       console.log(data);
      this.searchData = {
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        fromDate: data.fromDate,
        toDate: data.toDate,        
        take: this.paginateData[1],
        skip: this.paginateData[0],
        orderBy: this.sotingname == '' ? 'issuedByName ' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
        MaterialIds :data.ItemName && data.ItemName.length > 0 ? data.ItemName : [],
        MaterialCategory :data.MaterialCategory && data.MaterialCategory.length > 0 ? data.MaterialCategory : []
      }

      this.searchObject = {
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        fromDate: data.fromDate,
        toDate: data.toDate,
        take: 5000,
        skip: 0,
        MaterialIds :data.ItemName && data.ItemName.length > 0 ? data.ItemName : [],
        MaterialCategory :data.MaterialCategory && data.MaterialCategory.length > 0 ? data.MaterialCategory : []
      }

      this.displayArr = [];
     
      if (this.filteredCustomers != null && this.filteredCustomers.length > 0) {
        var ss = 'Customers:' + this.filteredCustomers.join(',');
        this.displayArr.push(ss);
      }
      if (data.ItemName != null && data.ItemName != '') {
        let index = this.ItemNames.findIndex(x => x.keyName == data.ItemName)
        var ss = 'Material:' + this.ItemNames[index].displayText;
        this.displayArr.push(ss);
      }
      if (data.MaterialCategory != null && data.MaterialCategory != '') {
        let index = this.MaterialCategoryNames.findIndex(x => x.keyName == data.MaterialCategory);

        var ss = 'Material Category:' + this.MaterialCategoryNames[index].displayText;
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
      
     console.log(this.displayArr);
     

      this.service.getMaterialStockReport(this.searchData).subscribe((response: any) => {
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
        } else if (removeData[0] == 'Material'){
          this.searchForm.get('ItemName')?.setValue(null)
        } else if (removeData[0] == 'Material Category'){
          this.searchForm.get('MaterialCategory')?.setValue(null)
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
    this.service.getMaterialStockReport(this.searchObject).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
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
        'S.No.': i,
        'Material Description': element.materialName,
        'Item Code': element.id,
         'Unit': element.unit ,
        'Received (A)': element.receivedQty,
        'Issued (B)': element.qty,
        'Stock (A-B)':element.stock,
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

