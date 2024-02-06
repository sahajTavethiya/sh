import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/library/shared/services/base.service';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { MaterialReportDetailService } from './material-report-detail.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewReciptDocumentComponent } from '../view-recipt-document/view-recipt-document.component';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-meterial-report-details',
  templateUrl: './meterial-report-details.component.html',
  styleUrls: ['./meterial-report-details.component.scss']
})

export class MeterialReportDetailsComponent implements OnInit {
  requestForm: FormGroup;
  addForm : FormGroup;
  addFormGranted : boolean = false
  materialReceiptId: number;
  Material_Details: any;
  cols: Array<any>;
data : any = {}

isgeneratePDFs = false;
selectable = true;
removable = true;
addOnBlur = true;
displayModal: boolean = false;
paginateData: Array<any> = [0, 10];
paginateDataedit: Array<any> = [0, 10];
totalRecords = 0;
sotingname = '';
OrderBy = 'Asc';
textsearch: any = '';
isAllSelect: boolean = false;
allVendors : any = [{}];

  constructor(readonly auth: AuthService, readonly route: ActivatedRoute ,readonly service :MaterialReportDetailService, readonly dialog: MatDialog) { 
  }

  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
   console.log(json.token);
   
    this.materialReceiptId = this.route.snapshot.params.materialReceiptId;
    this.service.MatrialReciptDetailsById(this.materialReceiptId,json.token).subscribe((responce:any)=>{
      console.log(responce);
      this.Material_Details = responce.data.materialReceiptDetail;
      this.data.createdOn=  this.service.Moment(responce.data.materialReceipt.createdOn).format("MM-DD-YYYY")
      this.data.createdByName = responce.data.materialReceipt.createdByName;
      this.data.materialReceiptId = responce.data.materialReceipt.materialReceiptId;
      this.data.modifiedBy = responce.data.materialReceipt.modifiedBy;
      this.data.modifiedByName = responce.data.materialReceipt.modifiedByName;
      this.data.materialCode = responce.data.materialReceipt.materialCode;
      this.data.materialUnit = responce.data.materialReceipt.materialUnit;
      this.data.modifiedOn =this.service.Moment( responce.data.materialReceipt.modifiedOn).format("MM-DD-YYYY");
      this.data.companyName = responce.data.materialReceipt.companyName == null ? "N/A" : responce.data.materialReceipt.companyName;
      this.imgName = responce.data.materialReceipt.imageName;
      this.data.createdBy = responce.data.materialReceipt.createdBy;
      this.data.notes = responce.data.materialReceipt.notes;
      //this.data = responce.data.materialReceipt;
      this.bindColumns();

      this.addForm = new FormGroup({
        file: new FormControl(null, Validators.required),
      });
    });
    this.service.getAllVendor().subscribe((responce:any)=>{
      responce.data.forEach((element:any) => {
        this.allVendors.push({id:element.id,companyName : element.companyName});
      });
    });
    console.log("this is a all vendors",this.allVendors);    
  }
  bindColumns(){
    this.cols = [//Lead Number
   // { header: 'Material Id', field: 'materialId' },
    {header:'Material Name',field:'materialName'},
    //{ header: 'Material Receipt Detail Id', field: 'materialReceiptDetailId' },
   // { header: 'Qty', field: 'qty' },
    { header: 'Item Code', field: 'materialItemCode ' },
    { header: 'Unit', field: 'materialUnit' },

   // { header: 'Material Receipt Id', field: 'materialReceiptId' },
    { header: 'Received Qty', field: 'receivedQty' },

  ];
  }
  onSubmit(Reqdata:any){
     if(Reqdata.VendorId?.length <= 0){
     var vendorObj = this.allVendors.find((x:any)=>x.companyName == this.data.companyName)
     if(vendorObj == null){
       Reqdata.VendorId = -1;
     }else{
      Reqdata.VendorId = vendorObj.id;
     }     
       
        }
     if(Reqdata.Notes.length < 1){
      Reqdata.Notes = this.data.notes
     };     
     Reqdata.MaterialReceiptId = this.materialReceiptId;
     this.service.updateMRVenodorAndNote(Reqdata).subscribe((responce:any)=>{
      this.service.notify.showError(responce.data[0].msg);
     })
     
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
      //this.search();
    } 

  }
  viewCustomerDetails(){
    
  }
  blob:any;
  requestId:any;
  viewImage(){
    if (1 == 1) {
    // const documentList = this.requestForm.controls.documentList?.value;
    const imageName = this.imgName;
    if (imageName) {
      const dialogRef = this.dialog.open(ViewReciptDocumentComponent, {
        data: { image: imageName},
        width: '800px'
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          // this.addTaskType(result);
        }
      });
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }
    } else {
      this.service.notify.showError('Please select Service in Service Request Details');
      //   }
    }

  this.service.downloadMaterialReceiptFile(this.imgName).subscribe((data:any) => {
      
    // console.log(data);
    // this.blob = new Blob([data], {type: 'application/jpeg'});
  
    // var downloadURL = window.URL.createObjectURL(this.blob);
    // console.log(downloadURL);
    
    // var link = document.createElement('a');
    // link.href = downloadURL;
    // link.click();
})

}
addNewSR(){
  this.addFormGranted = true;
  this.displayModal = true;
}
imgName:any;
onFileSelected(event:any){
  const files: FileList = event.target.files; 
  this.imgName = event.target.files[0].name; 
  if (files.length > 0) {
    const file = files[0]; 

    const reader :any = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.toString().split(',')[1];
      this.addForm.patchValue({ file: base64String});
      this.addForm.patchValue({ ImageName:  this.imgName});
    };
    reader.readAsDataURL(file);
  }
  
}
materialReceiptDetail:any;
saveNotes(){  
  console.log(this.imgName);
  
  let saveData = this.addForm.value;
  let reqData = {
    materialReceipt : {
      materialReceiptId : this.data.materialReceiptId,
      createdBy:this.data.createdBy,
      createdOn : this.data.createdOn,
      modifiedBy :  this.data.modifiedBy,
      modifiedOn : this.data.modifiedOn,
      imageData : saveData.file,
      imageName : this.imgName
    },
    materialReceiptDetail : [ {} ]
  }
  reqData.materialReceiptDetail = [];
  this.Material_Details.forEach((element:any) => {
   let data1 =  {
      materialReceiptDetailId : element.materialReceiptDetailId,
      materialReceiptId : element.materialReceiptId,
      materialId : element.materialId,
      qty : element.qty,
      receivedQty : element.receivedQty,
      rowStatus : element.rowStatus
    }
    reqData.materialReceiptDetail.push(data1);
  })  
  
  this.service.saveMaterialReceipt(reqData).subscribe((response:any)=>{
    console.log(response);
  })
  this.displayModal = false;
}
downloadPDF(){
  this.service.downloadPDF(this.materialReceiptId).subscribe((data:any)=>{

    this.blob = new Blob([data], {type: 'application/pdf'});
    
    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    // if(this.requestForm.controls.request.get('serviceId')?.value==1){
      link.download ="Voucher_MR_"+this.materialReceiptId+".pdf";
    // }
    // else
    // {
    //   link.download ="RFC_"+this.requestForm.controls.request.get('customerId')?.value;
    // }
    link.click();
  }) 
}

}


