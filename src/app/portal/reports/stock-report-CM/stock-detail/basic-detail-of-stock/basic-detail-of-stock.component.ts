import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddBasicDetailOfStock } from 'src/app/library/core/models/report/stockReport/stock-basic-detail.model';
import { StockCMService } from '../../stock-cm.service';

@Component({
  selector: 'app-basic-detail-of-stock',
  templateUrl: './basic-detail-of-stock.component.html',
  styleUrls: ['./basic-detail-of-stock.component.scss']
})
export class BasicDetailOfStockComponent implements OnInit {
  @Input() requestForm: FormGroup;
  @Input() lookups : any;
  WorkTypeArray : Array<any>;
  StockItemArray : Array<any>;
  SizeMaster : Array<any>;
  ProductMaster : Array<any>;
  DesignMaster : Array<any>;
  StatusMaster : Array<any>;
  ColourMaster : Array<any>;
  showColourMaster = false;
  showSizeMaster = false;
  showMeterPerItem = false;
  constructor(readonly service: StockCMService,) { }

  ngOnInit(): void {
    this.bindDropdowns();
  }

  bindDropdowns() {
    // const categories = [
    //   this.service.constants.MasterCategories.RoleMaster,
    //   this.service.constants.MasterCategories.ClientMaster,
    //   this.service.constants.MasterCategories.WorkTypeMaster,
    //   this.service.constants.MasterCategories.ProductMaster,
    //   this.service.constants.MasterCategories.SizeMaster,
    //   this.service.constants.MasterCategories.DesignMaster,
    //   this.service.constants.MasterCategories.StatusMaster,
    // ];
    //  this.WorkTypeArray = this.lookups[this.service.constants.MasterCategories.WorkTypeMaster];
      this.StockItemArray = this.lookups[this.service.constants.MasterCategories.StockItemMaster];
   //   this.ProductMaster = this.lookups[this.service.constants.MasterCategories.ProductMaster];
      this.SizeMaster = this.lookups[this.service.constants.MasterCategories.SizeMaster];
    //  this.DesignMaster = this.lookups[this.service.constants.MasterCategories.DesignMaster];
    //  this.StatusMaster = this.lookups[this.service.constants.MasterCategories.StatusMaster];
      this.ColourMaster = this.lookups[this.service.constants.MasterCategories.ColourMaster];
  }
  public get RequestDetail() {
    return this.requestForm as FormGroup;
  }
  ChangeStockItem(){
    let StockItemId  = this.requestForm.get('StockItemId')?.value;
    console.log("its sahaj j devloping",StockItemId)
    if( StockItemId == 1){
      this.showSizeMaster = true;
      this.showColourMaster = false;
      this.showMeterPerItem = false;
    }
    if( StockItemId == 2){
      this.showSizeMaster =false;
      this.showColourMaster = true;
      this.showMeterPerItem = false;
    } if(StockItemId == 3){
      this.showSizeMaster =false;
      this.showColourMaster = false;
      this.showMeterPerItem = true;
    }
  }
}
