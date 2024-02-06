import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { MeterMasterService } from './meterMaster.service';
import * as XLSX from 'xlsx';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MeterMasterCriteria } from 'src/app/library/core/models/meterMaster/meter-master-criteria.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-meter-master',
  templateUrl: './meter-master.component.html',
  styleUrls: ['./meter-master.component.scss']
})
export class MeterMasterComponent implements OnInit {
  metetForm: FormGroup;
  cols: Array<any>;
  meterData: Array<any>;
  zones: Array<any> = [];
  clients: Array<any> = [];
  statusArr: Array<any> = [];
  paginateData: Array<any> = [0, 10];
  totalRecords = 0;
  sotingname = '';
  OrderBy = 'Asc';
  textsearch: any = '';
  filteredMeter: Array<any> = [];
  removable = true;
  addOnBlur = true;
  selectable = true;
  
  displayModal: boolean;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor(readonly service: MeterMasterService, readonly dialog: MatDialog,
    readonly formBuilder: RxFormBuilder) { }

  ngOnInit(): void {
    
    const criteria = new MeterMasterCriteria();
    this.metetForm = this.formBuilder.formGroup(criteria);
    this.bindColumns();
    
    this.bindDropdowns()
    this.search();
    
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.ZoneMaster,
      this.service.constants.MasterCategories.ServiceForMaster
    ];

    this.statusArr = [
      { keyName: null, displayText: 'All Status' },
      { keyName: 'Consumed', displayText: 'Consumed' },
      { keyName: 'In-Stock', displayText: 'In-Stock' }
    ];

    this.clients.push({ keyName: 0, displayText: 'All Clients' });
    this.service.getLookups(categories, (lookups) => {
      this.zones.push(...lookups[this.service.constants.MasterCategories.ZoneMaster]);
      this.clients.push(...lookups[this.service.constants.MasterCategories.ServiceForMaster]);
    });

    
  }

  bindColumns() {
    this.cols = [
      { header: 'Meter Number', field: 'meterNumber' },
      { header: 'Meter Type', field: 'meterType' },
      { header: 'Meter Make Description', field: 'meterMakeDescription' },
      { header: 'City', field: 'city' },
      { header: 'ServiceFor ', field: 'serviceFor' },
      { header: 'Customer Id ', field: 'consumer' }
    ];
    
  }

  showBasicDialog() {
    this.displayModal = true;
  }

  removedMeterId(customer: any) {
    const index = this.filteredMeter.indexOf(customer);
    if (index >= 0) {
      this.filteredMeter.splice(index, 1);
      // this.metetForm.get('meterNo')?.setValue(this.filteredMeter);
    }
  }

  adddMeterId(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.filteredMeter.push(value);
      // this.metetForm.get('meterNo')?.setValue(this.filteredMeter);
    }
    event.chipInput!.clear();
  }

  reset() {
    this.metetForm.reset();
    this.filteredMeter = [];
    this.totalRecords = 0
    this.search();
  }

  search() {
    this.displayModal = false;
    let searchData= {
      take: this.paginateData[1],
      skip: this.paginateData[0],
      OrderBy: this.sotingname == '' ? 'meterNumber ASC' : this.sotingname + ' ' + this.OrderBy,
      search: this.textsearch,
      meterNo: this.filteredMeter,
      serviceForId: this.metetForm.getRawValue().serviceForId,
      zoneIds: this.metetForm.getRawValue().zoneIds,
      status: this.metetForm.getRawValue().status
    }
    this.service.getMeterMakeMaster(searchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.meterData = response.data.result;
        this.paginateData[0] = 0;
        this.totalRecords = response.data.rowCount;
      }
      else {
        this.meterData = [];
        this.paginateData[0] = 0;
        this.totalRecords = 0;
      }
    });
    
  }

  exportCSV() {
    let searchData= {
      OrderBy: this.sotingname == '' ? 'meterNumber ASC' : this.sotingname + ' ' + this.OrderBy,
      search: this.textsearch,
      meterNo: this.filteredMeter,
      serviceForId: this.metetForm.getRawValue().serviceForId,
      zoneIds: this.metetForm.getRawValue().zoneIds,
      status: this.metetForm.getRawValue().status
    }
    this.service.getMeterMakeMaster(searchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.export(response.data.result);
      }
    });
  }

  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
        'Meter Number ': element.meterNumber,
        'Meter Type ': element.meterType,
        'Meter Make Description ': element.meterMakeDescription,
        'City': element.city,
        'ServiceFor': element.serviceFor,
        'Customer Id': element.consumer
      }
      data.push(singalData);
    });


    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
    ]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'MeterList'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'MeterList.xlsx'); // initiate a file download in browser
  }

  sotingData(name: any) {
    if (name != "action") {
      if (this.sotingname != name) {
        this.OrderBy = 'Asc';
      } else {
        this.OrderBy = this.OrderBy == 'Desc' ? 'Asc' : 'Desc';
      }
      this.sotingname = name;
      this.search();
    }

  }

  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.search();

  }

  searchbox(val: any) {
    console.log(val);
    this.textsearch = val;
    setTimeout(() => {
      this.search();
    }, 1000);
    
  }

}
