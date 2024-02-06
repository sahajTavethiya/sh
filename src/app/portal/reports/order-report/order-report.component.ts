import { Component, OnInit } from '@angular/core';
import { OrderReportServiceService } from './order-report-service.service';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MaterialReportIssueListModel } from 'src/app/library/core/models/report/material-report-issue.model';
import { LazyLoadEvent } from 'primeng/api';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { OrderReportModel } from 'src/app/library/core/models/report/order-report.model';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})



export class OrderReportComponent implements OnInit {

  constructor(readonly service: OrderReportServiceService, readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,
    private routeUrl: Router) { }
  materialReceiptId: any

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

  employeeList: any;
  employeeNames: { displayText: any, keyName: any; }[] = []
  ItemList: any;
  ItemNames: { displayText: any, keyName: any; }[] = []

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


  RoleMaster: Array<any>;
  StockItemMaster: Array<any>;
  ClientMaster: Array<any>;
  WorkTypeMaster: Array<any>;
  ProductMaster: Array<any>;
  DesignMaster: Array<any>;
  StatusMaster: Array<any>;


  searchObject: any = {} // for exel 
  cols = [
    { header: 'Material Issue Id', field: 'materialIssueId' },
    { header: 'issued By Name', field: 'issuedByName' },
    { header: 'issued To Name', field: 'employeeName' },
    { header: 'Issued On', field: 'issuedOn' },
  ]

  Material_Details: any = []
  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // this.initialize();
    this.bindColumns();
    this.bindDropdowns();
    // this.service.GetAllEmployees().subscribe((response: any) => {
    //   console.log(response); 
    //   this.employeeList = response.data;
    //   response.data.forEach((element:any,index:any)=>{
    //     this.employeeNames.push({displayText : element.displayText,keyName: parseInt(element.keyName)})
    //   });    
    // });
    // this.service.GetAllMaterial().subscribe((response: any) => {
    //   console.log(response); 
    //   this.ItemList = response.data.table;
    //   response.data.table.forEach((element:any,index:any)=>{
    //     this.ItemNames.push({displayText : element.materialName,keyName: parseInt(element.id)})
    //   });    
    // });
  }

  initialize() {
    const searchCriteria = new OrderReportModel();
    console.log(searchCriteria);

    this.searchForm = this.formBuilder.formGroup(searchCriteria);

    setTimeout(() => {
      this.search();
    }, 600);

  }

  bindDropdowns() {
    const categories = [
      this.service.constants.OrderReportCategories.RoleMaster,
      this.service.constants.OrderReportCategories.StockItemMaster,
      this.service.constants.OrderReportCategories.ClientMaster,
      this.service.constants.OrderReportCategories.WorkTypeMaster,
      this.service.constants.OrderReportCategories.ProductMaster,
      this.service.constants.OrderReportCategories.DesignMaster,
      this.service.constants.OrderReportCategories.StatusMaster
    ];

    this.service.getLookups(categories, ((lookups: any) => {
      // console.log(JSON.stringify(lookups));
      if (lookups) {
        this.RoleMaster = lookups[this.service.constants.OrderReportCategories.RoleMaster];
        this.StockItemMaster = lookups[this.service.constants.OrderReportCategories.StockItemMaster];
        this.ClientMaster = lookups[this.service.constants.OrderReportCategories.ClientMaster];
        this.WorkTypeMaster = lookups[this.service.constants.OrderReportCategories.WorkTypeMaster];
        this.ProductMaster = lookups[this.service.constants.OrderReportCategories.ProductMaster];
        this.DesignMaster = lookups[this.service.constants.OrderReportCategories.DesignMaster];
        this.StatusMaster = lookups[this.service.constants.OrderReportCategories.StatusMaster];
      }
      console.log("Role Master - ", this.RoleMaster);
      console.log("Stock Item Master - ", this.StockItemMaster);
      console.log("Client Master - ", this.ClientMaster);
      console.log("Work Type Master - ", this.WorkTypeMaster);
      console.log("Product Master - ", this.ProductMaster);
      console.log("Design Master - ", this.DesignMaster);
      console.log("Status Master - ", this.StatusMaster);
    }));

    this.initialize();
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
      // { header: 'Vendor Name', field: 'Vendor Name' },
      // { header: 'Store Name', field: 'Store Name' },
      { header: 'Order Id', field: 'OrderId' },
      { header: 'Work Type', field: 'WorkType' },
      { header: 'Product Name', field: 'ProductName' },
      { header: 'Client Name', field: 'ClientName' },
      { header: 'Design Name', field: 'DesignName' },
      { header: 'Size', field: 'Size' },
      { header: 'Total Item', field: 'TotalItem' },
      { header: 'Amount Per Piece', field: 'AmountPerOneItem' },
      { header: 'Total Amount', field: 'TotalAmount' },
      { header: 'Bill No', field: 'BillNo' },
      { header: 'UOM', field: 'UOM' },
      { header: 'Date', field: 'Date' },
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
  searchbox(val: any) {
    this.textsearch = val;
    this.search();
  }
  search() {
    this.isAllSelect = false;
    this.getbulkSelect = [];

    if (this.searchForm.valid) {
      this.displayModal = false;
      let data = this.searchForm.getRawValue();
      console.log("this is a data", data);
      this.searchData = {
        workTypeId: data.workTypeId && data.workTypeId.length > 0 ? data.workTypeId : [],
        fromDate: data.fromDate,
        toDate: data.toDate,
        // take: this.paginateData[1],
        // skip: this.paginateData[0],
        // orderBy: this.sotingname == '' ? 'issuedByName ' : this.sotingname + ' ' + this.OrderBy,
        clientId: data.clientId && data.clientId.length > 0 ? data.clientId : [],
        productId: data.productId && data.productId.length > 0 ? data.productId : [],
        designId: data.designId && data.designId.length > 0 ? data.designId : [],
        statusId: data.statusId && data.statusId.length > 0 ? data.statusId : [],
        // search: this.textsearch,
      }

      this.searchObject = {
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        fromDate: data.fromDate,
        toDate: data.toDate,
      }

      this.displayArr = [];

      // if (this.filteredCustomers != null && this.filteredCustomers.length > 0) {
      //   var ss = 'Customers:' + this.filteredCustomers.join(',');
      //   this.displayArr.push(ss);
      // }
      // if (data.mobile != null && data.mobile != '') {
      //   var ss = 'Mobile:' + data.mobile;
      //   this.displayArr.push(ss);
      // }
      // if (data.fromDate != null && data.toDate != null) {
      //   var ss = 'Date: Between ' + this.service.Moment(data.fromDate).format("MM-DD-YYYY") + ' To ' + this.service.Moment(data.toDate).format("MM-DD-YYYY");
      //   this.displayArr.push(ss);
      // } else if (data.fromDate != null) {
      //   var ss = 'Date: From ' + this.service.Moment(data.fromDate).format("MM-DD-YYYY");
      //   this.displayArr.push(ss);
      // } else if (data.toDate != null) {
      //   var ss = 'Date: To ' + this.service.Moment(data.toDate).format("MM-DD-YYYY");
      //   this.displayArr.push(ss);
      // }
      // if (data.zones != null && data.zones != '') {
      //   this.zonesName = [];
      //   this.searchData.zoneIds.forEach((keys: any, vals: any) => {
      //     this.zones.forEach(x => {
      //       if (x.keyName.includes(keys)) {
      //         if (x.keyName === keys) {
      //           this.zonesName.push(x.displayText)
      //         }
      //       }
      //     });
      //   })
      //   var ss = 'Zones:' + this.zonesName.join(',');
      //   this.displayArr.push(ss);
      // }

      // console.log(this.displayArr);


      this.service.getOrderReport(this.searchData).subscribe((response: any) => {
        if (response && response.data && response.data.length > 0) {
          this.Material_Details = response.data;
          this.paginateData[0] = 0;
          //   this.totalRecords = response.data.rowCount;
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
  showBasicDialog() {
    this.displayModal = true;
  }
  removeSearching(data: string): void {
    const index = this.displayArr.indexOf(data);
    if (index >= 0) {
      var removeData = data.split(':');
      if (removeData[0] == 'Date') {
        this.searchForm.get('fromDate')?.setValue(null);
        this.searchForm.get('toDate')?.setValue(null);
      } else if (removeData[0] == 'srNumbers') {

      }
      else if (removeData[0] == 'customerIds') {
        this.filteredCustomers = [];
      } else if (removeData[0] == 'Zones') {
        this.searchForm.get('zones')?.setValue(null)
      } else {
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

  addOrder() {
    this.routeUrl.navigate(['/OrderReportDetail'])
  }
  reset() {
    this.searchForm.reset();
    this.displayArr = [];
    this.filteredCustomers = [];
    this.totalRecords = 0
    this.Material_Details = new Array<MaterialReportIssueListModel>();
  }
  exportCSV() {
    let data = this.searchForm.getRawValue();
    // this.service.getAllMaterialIssueForExcelExport(this.searchObject).subscribe((response: any) => {
    //   if (response && response.data && response.data.result.length > 0) {
    //     console.log(response.data.result.length);

    //     this.export(response.data.result);
    //   }
    // });
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
        'SIV': element.materialIssueId,
        'SIV Date': element.issuedOn,
        'Item Name': element.materialName,
        'Item Code': element.materialCode,
        'Issue to': element.issuedByName,
        'Received by': element.issuedToName,
        'Unit': element.materialUnit,
        'Issued Qty': element.qty,
        'Notes': element.notes,
        'Image': element.imageName

      }
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 18 }, { wch: 21 }, { wch: 15 }, { wch: 25 }, { wch: 30 }, { wch: 15 }, { wch: 12 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'MIList'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'MIList ' + Dateto + '.xlsx'); // initiate a file download in browser
  }



}
