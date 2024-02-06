
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SearchSRCriteria } from 'src/app/library/core/models/report/project-report.model';
 
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
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})

export class ProjectReportComponent implements OnInit {
  oldUrl: string = environment.oldUrl;
  searchForm: FormGroup;
  apiUrl: string = environment.apiUrl;
  getbulkSelect: Array<any> = [];
  blob: any;
  displayArr: Array<any> = [];
  searchData: any
  
  //isgeneratePDFs = false;
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

  constructor(readonly service: ReportsService, readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,private location:Location) {

  }

  ngOnInit(): void {

    
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (json.roleID == 1 || json.roleID == 2) {
     // this.isgeneratePDFs = true;
    }
    this.bindColumns();
    this.initialize();
  }

  
  showBasicDialog() {
    this.displayModal = true;
  }



  bindColumns() {
    this.cols = [
      { header: 'Project Code', field: 'ProjectCode' },
      { header: 'Project Name', field: 'ProjectName' },
      { header: 'Start Latitude', field: 'startLatitude' },
      { header: 'Start Longitude', field: 'startLongitude' },
      { header: 'Start Depth', field: 'startDepth' },
      { header: 'End Latitude', field: 'endLatitude' },
      { header: 'EndLongitude', field: 'endLongitude' },
      { header: 'End Depth', field: 'endDepth' },
      { header: 'MDPE PipeDiameter', field: 'mdpE_PipeDiameter' },
      { header: 'Casting PipeDiameter', field: 'castingPipeDiameter' },
      { header: 'Testing Date', field: 'testingDate' },
      { header: 'Commissioning Date', field: 'commissioningDate' },
      { header: 'Pipeline ConstructionMethod', field: 'pipelineConstructionMethod' },
      { header: 'Road Type', field: 'roadType' },
      { header: 'Fittings Desc', field: 'fittingsDesc' },
      { header: 'Fittings Lattitude', field: 'fittingsLattitude' },
      { header: 'Fittings Longitude', field: 'fittingsLongitude' },
      { header: 'Created By', field: 'createdBy' },
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
    const searchCriteria = new SearchSRCriteria();
    this.searchForm = this.formBuilder.formGroup(searchCriteria);
    this.searchForm.patchValue({requestFrom: moment(Date.now() - 1 * 24 * 3600 * 1000).format('YYYY-MM-DD')})
    this.searchForm.patchValue({requestTo: moment(Date.now()).format('YYYY-MM-DD')})
    this.search();
  }

  reset() {
    this.searchForm.reset();
    this.displayArr = [];
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
        take: this.paginateData[1],
        skip: this.paginateData[0],
        OrderBy: this.sotingname == '' ? 'projectCode' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch
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
      
      

      this.service.GetProjectReport(this.searchData).subscribe((response: any) => {
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
      search: this.textsearch
    }


    this.service.GetProjectReport(searchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.export(response.data.result);
      }
    });
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
        'Project Code' : element.projectCode,
        'Project Name' : element.projectName,
        'Start Latitude' : element.startLatitude,
        'Start Longitude' : element.startLongitude,
        'Start Depth' : element.startDepth,
        'End Latitude' : element.endLatitude,
        'End Longitude' : element.endLongitude,
        'End Depth' : element.endDepth,
        'MDPE PipeDiameter' : element.mdpE_PipeDiameter,
        'Casting PipeDiameter' : element.castingPipeDiameter,
        'Testing Date' : element.testingDate != null ?this.service.Moment(element.testingDate).format("MM-DD-YYYY"):'' ,
        'Commissioning Date' : element.commissioningDate != null ?this.service.Moment(element.commissioningDate).format("MM-DD-YYYY"):'' ,
        'Pipeline ConstructionMethod' : element.pipelineConstructionMethod,
        'Road Type' : element.roadType,
        'Fittings Desc' : element.fittingsDesc,
        'Fittings Lattitude' : element.fittingsLattitude,
        'Fittings Longitude' : element.fittingsLongitude,
        'Created By' : element.createdBy,
        'Created On' : element.createdOn != null ?this.service.Moment(element.createdOn).format("MM-DD-YYYY"):'' ,
      }
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 30 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Project Report'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Project Report '+Dateto+'.xlsx'); // initiate a file download in browser
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
