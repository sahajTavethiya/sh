import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EnquiryTaskLine } from 'src/app/library/core/models/service-request/enquiry-task-line.model';
import { environment } from 'src/environments/environment';
import { MaterialReportDetailService } from '../meterial-report-details/material-report-detail.service';

@Component({
  selector: 'app-view-recipt-document',
  templateUrl: './view-recipt-document.component.html',
  styleUrls: ['./view-recipt-document.component.scss']
})
export class ViewReciptDocumentComponent implements OnInit {

  ViewImageForm: FormGroup;
  // @Input() requestId: any;
   @Input() requestForm: FormGroup;
   blob :any;
   apiUrl: string = environment.apiUrl;
   documentList: any = [];
   downloadLink :any;
   constructor(readonly formBuilder: RxFormBuilder,
     readonly service: MaterialReportDetailService,
   
    @Inject(MAT_DIALOG_DATA) public data: { image: string ,filePath : any},
     public dialogRef: MatDialogRef<ViewReciptDocumentComponent>) { }
     documentData:any;
   ngOnInit(): void {
     console.log(this.data);
     
     
     // this.data = {
     //   documentList : [{},{}],
     //   requestId : 1,
     // }
     // this.documentList = this.data.documentList;
 
     // this.documentList.forEach(element => {
     //   let formet = element.fileName.split('.');
     //   if(formet[1] == "jpeg"){
     //     element.formet = true;
     //   }else{
     //     element.formet = false;
     //   }
       
     // });
 
     let imageExt = this.data.image.split(".");
     let Ext = imageExt[imageExt.length - 1]
     this.service.downloadMaterialReceiptFile(this.data.image).subscribe((data1:any) => {
       this.blob = new Blob([data1], {type: `application/${Ext}`});
       this.documentData = data1; 
       var downloadURL = window.URL.createObjectURL(this.blob);
       var link = document.createElement('a');
       link.href = downloadURL;
       this.data.filePath = downloadURL;       
       this.documentList.push(this.data);
       this.downloadLink = link;
       link.download = this.data.image;
 
       // link.click();
     
     },
     // (error) => {
     //   this.service.notify.showError('File Not Found');
     //   // console.log(error);
     // }
     );
 
   }
   token:any;
 
   viewImageAll(){
 
     this.service.downloadMaterialReceiptFile(this.data.image).subscribe((data:any) => {
      
       // this.blob = new Blob([data], {type: 'application/jpeg'});
     
       // var downloadURL = window.URL.createObjectURL(this.blob);
       // var link = document.createElement('a');
       // link.href = downloadURL;
       // link.download ="AllDocuments";
       // link.click();
     
     },
     // (error) => {
     //   this.service.notify.showError('File Not Found');
     //   // console.log(error);
     // }
     );
     
     // let url = this.apiUrl+"/servicerequest/downloadDocument?type=ServiceDocs&enquiryId="+this.data.requestId;
     // window.open(url, "_blank");
 
   }
   viewImage(name:any){
 
 
     
     // let url  = this.apiUrl+"/servicerequest/downloadDocument?type=Service&enquiryId="+this.data.requestId+"&filename="+name;
     // window.open(url, "_blank");
 
   }
 
  
 
   cancel() {
     this.dialogRef.close()
   }
   
   downloadImage(){
     this.blob = new Blob([this.documentData], {type: 'application/jpeg'});
     console.log(this.downloadLink);
     var downloadURL = window.URL.createObjectURL(this.blob);
     var link = document.createElement('a');
     link.href = downloadURL;
     link.download = this.data.image;
     link.click();
     
   }

}
