import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ViewDocumentComponent } from '../../view-document/view-document.component';
import { MaterialIssueService } from '../material-issue.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-material-issue-detail',
  templateUrl: './material-issue-detail.component.html',
  styleUrls: ['./material-issue-detail.component.scss']
})
export class MaterialIssueDetailComponent implements OnInit {

  constructor(readonly service: MaterialIssueService ,readonly route: ActivatedRoute, readonly dialog: MatDialog) { }
  addForm : FormGroup;
  addFormGranted : boolean = false;
  requestForm: FormGroup;
  materialReceiptId: number;
  Material_Details: any;
  cols: Array<any>;
data : any = {}

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
token:any;
notes:any;

  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
   this.token =json.token;
   
    this.materialReceiptId = this.route.snapshot.params.materialReceiptId;
    this.service.materialIssueDetail(this.materialReceiptId).subscribe((responce:any)=>{
      console.log(responce);
      this.Material_Details = responce.data.materialIssueDetail;
      
     this.data.issuedBy = responce.data.materialIssue.issuedBy;
      this.data.createdOn=  this.service.Moment(responce.data.materialIssue.createdOn).format("MM-DD-YYYY")
      this.data.issuedByName = responce.data.materialIssue.issuedByName;
      this.data.materialReceiptId = responce.data.materialIssue.materialIssueId;
      this.data.modifiedBy = responce.data.materialIssue.modifiedBy;
      this.data.issuedToName = responce.data.materialIssue.issuedToName;
      this.data.materialCode = responce.data.materialIssue.materialCode;
      this.data.materialUnit = responce.data.materialIssue.materialUnit;
      this.data.modifiedOn =this.service.Moment( responce.data.materialIssue.modifiedOn).format("MM-DD-YYYY");
     this.imgName = responce.data.materialIssue.imageName;
     this.data.notes = responce.data.materialIssue.notes;
     this.data.createdBy = responce.data.materialIssue.createdBy;
     this.data.issuedTo = responce.data.materialIssue.issuedTo;
     this.data.issuedOn = responce.data.materialIssue.issuedOn;
     this.data.materialIssueDetailId = responce.data.materialIssueDetail.materialIssueDetailId;
     this.data.materialIssueId = responce.data.materialIssueDetail.materialIssueId;
     this.data.materialId = responce.data.materialIssueDetail.materialId;
     this.data.qty = responce.data.materialIssueDetail.qty;
     this.data.rowStatus = responce.data.materialIssueDetail.rowStatus;

      console.log("dsvndsjnv",this.data);
      //this.data = responce.data.materialReceipt;
      this.bindColumns();

      this.addForm = new FormGroup({
        file: new FormControl(null, Validators.required),
      });
    });
    
  }
  bindColumns(){
    this.cols = [//Lead Number
    {header:'material Name',field:'material Name'},
    { header: 'Item Code', field: 'materialItemCode ' },
    { header: 'Unit', field: 'materialUnit' },
    { header: 'Qty', field: 'Qty' },

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
      //this.search();
    } 

  }
  viewCustomerDetails(){
    
  }
  onSubmit(reqData:any){
    console.log("its in submit");
    
     if(reqData.Notes.length < 1){
      reqData.Notes = this.data.notes
     }
     reqData.MaterialIssueId = this.materialReceiptId;
     console.log(reqData);
     
     this.service.updateMINotes(reqData).subscribe((responce:any)=>{
      this.service.notify.showError(responce.data[0].msg);
     })
  }
  blob:any;
  requestId:any;
  viewImage(){
    if (1 == 1) {
    // const documentList = this.requestForm.controls.documentList?.value;
    const imageName = this.imgName;
    if (imageName) {
      const dialogRef = this.dialog.open(ViewDocumentComponent, {
        data: { image: imageName},
        width: '800px'
      });
      dialogRef.afterClosed().subscribe(result => {
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

  this.service.downloadMaterialIssueFile(this.imgName).subscribe((data:any) => {
      
    // console.log(data);
    // this.blob = new Blob([data], {type: 'application/jpeg'});
  
    // var downloadURL = window.URL.createObjectURL(this.blob);
    // console.log(downloadURL);
    
    // var link = document.createElement('a');
    // link.href = downloadURL;
    // link.download = this.imgName;
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

saveNotes(){
  console.log( this.addForm.value);
  console.log(this.imgName);  
  
  let saveData = this.addForm.value;
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let mm1 = mm.toString();
  let dd1 = dd.toString();
  if (dd < 10){
    dd1 = '0' + dd;
  } 
  if (mm < 10) {
    mm1 = '0' + mm;
  };
  
  //const formattedToday = `${dd}-${mm}-${yyyy}`;
 // const formattedToday = `${yyyy}-${mm}-${dd}`;
  const formattedToday = yyyy  + '-' + mm1 + '-' +dd1 ;
  console.log(this.data.createdBy);
  
  let reqData = {
    materialReceiptId: 0,
    materialIssueId: this.data.materialReceiptId,
    uploadedBy: this.data.issuedBy,
    uploadedOn: formattedToday,
    imageData: saveData.file,
    imageName: this.imgName
  }
  
  this.service.saveMaterialIssue(reqData).subscribe((response:any)=>{
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
      link.download ="Voucher_MI_"+this.materialReceiptId+".pdf";
    // }
    // else
    // {
    //   link.download ="RFC_"+this.requestForm.controls.request.get('customerId')?.value;
    // }
    link.click();
  }) 
}
}