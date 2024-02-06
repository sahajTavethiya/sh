import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { LazyLoadEvent } from 'primeng/api';
import { ConsumptionReportModel } from 'src/app/library/core/models/report/consumption-report.model';
import { SearchSRMeterialResultModel } from 'src/app/library/core/models/service-request/search-sr-meterial-result.model';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { MeterialService } from '../meterial-report/meterial.service';
import { ConsuumptionService } from './consuumption.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { escapeLeadingUnderscores } from 'typescript';

@Component({
  selector: 'app-consumption-report',
  templateUrl: './consumption-report.component.html',
  styleUrls: ['./consumption-report.component.scss']
})
export class ConsumptionReportComponent implements OnInit {
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
  selectedEmployee:string;
searchObject : any= [] ; // for exel exporting
validationMsg : string
showMsg : Boolean = false;
employeeList : any;
employeeNames: { displayText: any,keyName:any; }[] = []
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  cols: Array<any>=[];
  MaterialReceipt: Array<SearchSRMeterialResultModel>;
  ComsuptionReport:Array<any>;
  serviceSubCategories: Array<any>;
  @ViewChild('customerId') customerId: ElementRef<HTMLInputElement>;

  constructor(readonly service: ConsuumptionService, readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,
    private routeUrl: Router) {

  }

  ngOnInit(): void {
  
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (json.roleID == 1 || json.roleID == 2) {
      this.isgeneratePDFs = true;
    }
  
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
        this.zones = lookups[this.service.constants.MasterCategories.ZoneMaster];
      }
    }));
    this.bindServiceMasterDropDown();
    this.initialize();
  }

  onZoneChange(){
    let data = this.searchForm.getRawValue();
    let zoneIds1= parseInt( data.zones && data.zones.length > 0 ? data.zones : []);
    let reqData ={
      userTypeId: 2,
      zoneId: zoneIds1      
    }
    this.service.GetEmployeeListByZoneIdAndTypeId(reqData).subscribe((response: any) => {
      console.log(response.data[0].displayText); 
      this.employeeList = response.data;
      this.employeeNames = [];
      response.data.forEach((element:any,index:any)=>{
        
        this.employeeNames.push({displayText : element.displayText,keyName: parseInt(element.keyName)})
      });
      this.showMsg = false;
      
  });


  }
  onEmployeeChange(){
    let data = this.searchForm.getRawValue();
    if(!data.zones){
      this.validationMsg = "please select zone";
      this.showMsg = true;
    }
  }

  showBasicDialog() {
    this.displayModal = true;
  }
  bindColumns(items:any) {
    this.cols = [//Lead Number
      { header: 'Material Receipt Id', field: 'materialReceiptId' },
      {header:'Received By Name',field:'receivedByName'},
      { header: 'Created On', field: 'createdOn' },
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
    const searchCriteria = new ConsumptionReportModel();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    
    setTimeout(() => {
      this.search();
    }, 600);
    
  }

  onDropdownChange(data:any) {
    // const selectedValue = data.value;
    console.log(data);
    this.paginateData[0] = data.first;
    this.paginateData[1] = data.rows;
    this.paginateDataedit[0] = data.first;
    this.paginateDataedit[1] = data.rows;
    this.search();
  }

  reset() {
    this.searchForm.reset();
    this.displayArr = [];
    this.filteredCustomers = [];
    this.totalRecords = 0
    this.ComsuptionReport = new Array<any>();
  }

  search() {
    this.isAllSelect = false;
    this.getbulkSelect = [];    
    if (this.searchForm.valid) {    
      this.displayModal = false;
      let data = this.searchForm.getRawValue();   
      
      this.searchData = {
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        fromDate: data.fromDate,
        toDate: data.toDate,
        materialCategoryID:data.materialCategoryID==null?0:data.materialCategoryID?.id,      
        take: this.paginateData[1],
        skip: this.paginateData[0],
        orderBy: this.sotingname == '' ? "SRNumber" : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
        ManpowerID : data.employeeName 
      };
      
      this.searchObject = {
        fromDate: data.fromDate,
        toDate: data.toDate,
        materialCategoryID:data.materialCategoryID==null?0:data.materialCategoryID?.id,
        zoneIds: data.zones && data.zones.length > 0 ? data.zones : [],
        ManpowerID : data.employeeName 
      }
      this.displayArr = [];
     
      if (data.materialCategoryID != null) {
        var ss = 'Material Category:' + data.materialCategoryID.categoryName;
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
      if(data.employeeName){
        const objWithKeyName = this.employeeList.find((obj:any) => obj.keyName == data.employeeName);
        var ss = 'Employee Name:' + objWithKeyName.displayText;
        this.displayArr.push(ss);
      }
      
     
      this.cols=[];
      this.service.comsumptionsearch(this.searchData).subscribe((response: any) => {
       console.log("this is a responce",response);
       
        if (response && response.data && response.data.table?.length > 0) {     

          response.data.table.forEach((element:any) => {
            var item =element.items.replace('[',"").replace(']',"");
            let singalData = {
              'items': item[0].toLowerCase()+item[1].toLowerCase() + item.slice(2),
               "header":item   
            }
            
            
            this.cols.push(singalData);
          });
          this.ComsuptionReport=  response.data.table1;

          this.paginateData[0] = 0;
          this.totalRecords = response.data.table2[0].rowCount;
        }
        else {
          this.ComsuptionReport = [];
          this.paginateData[0] = 0;
          this.totalRecords = 0;
        }
      });
    } else {
      this.service.notify.showError('Please enter the criteria');
    }
    // this.searchForm.reset();
  }
  searchBtn(){
    if (this.searchForm.valid) {    
      
      let data = this.searchForm.getRawValue();      
      if(data.materialCategoryID == null){
        this.showMsg = true;
        this.displayModal = true;
        this.validationMsg = "Material catagory is required property.";
      }else{
        this.displayModal = false;
        this.showMsg = false;
        this.search()
      }
    }
  }
  bindServiceMasterDropDown(){
    this.service.viewServiceMaster().subscribe((response: any) => {
    //debugger;
      if (response && response.data!=null) {        
    //  debugger;
        this.serviceSubCategories=response.data;
      }
      
    });
  }
  removeSearching(data: string): void {
    const index = this.displayArr.indexOf(data);
    if (index >= 0) {
      var removeData = data.split(':');
      console.log(removeData);
      
   //   debugger;
      if (removeData[0] == 'Date') {
        this.searchForm.get('fromDate')?.setValue(null);
        this.searchForm.get('toDate')?.setValue(null);
      }  else if (removeData[0] == 'Material Category') {
        this.searchForm.get('materialCategoryID')?.setValue(null);
      } else if (removeData[0] == 'Zones'){
        this.searchForm.get('zones')?.setValue(null)
      } else if (removeData[0] == 'Employee Name'){
        this.searchForm.get('employeeName')?.setValue(null)
      }
      else {
        this.searchForm.get(removeData[0])?.setValue(null);
      }
      this.totalRecords = 0
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


  //exel export
  exportCSV() {
    const searchCriteria = new ConsumptionReportModel();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    let data = this.searchForm.getRawValue();
    this.service.comsumptionsearch(this.searchObject).subscribe((response: any) => {
      if (response && response.data && response.data.table1.length > 0) {
        this.export(response.data.table1);
      }
    });
  }
  public export(json: any[]) {
   
    let data: any = [];
    json.forEach(element => {
      let singalData : any = {};
     for(let key in element){
      if (element.hasOwnProperty(key)) {
           console.log(element.key); 
            if(key == "completedDate"){
              const datetimeString = element[key];
               const datetime = new Date(datetimeString);
               const dateString = datetime.toISOString().split('T')[0];
              singalData[`${key}`] = dateString
            }
            else{

              singalData[`${key}`] = element[key] 
            }
            
      }
     }
      data.push(singalData);
      singalData= {};
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

}