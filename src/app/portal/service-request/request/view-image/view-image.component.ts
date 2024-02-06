import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EnquiryTaskLine } from 'src/app/library/core/models/service-request/enquiry-task-line.model';
import { environment } from 'src/environments/environment';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {
  ViewImageForm: FormGroup;
  addForm : FormGroup;@Input() requestId: any;
  @Input() requestForm: FormGroup;
  blob :any;
  apiUrl: string = environment.apiUrl;
  documentList: Array<any>;
  SRNumber : number;
  UploadButton :boolean = false;
  showButton :boolean =  false;
  showButtonOFImageUpload : boolean = false;
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: number ,documentList:any,requestId:number ,SRNumber:number },
    public dialogRef: MatDialogRef<ViewImageComponent>) { 
      this.SRNumber = this.data.SRNumber
    }

  ngOnInit(): void {
    this.documentList = this.data.documentList;
    this.SRNumber = this.data.SRNumber;
console.log("this is a SRNUmber",this.SRNumber);

    this.documentList.forEach(element => {
      let formet = element.fileName.split('.');
      if(formet[1] == "pdf"){
        element.formet = true;
      }else{
        element.formet = false;
      }
      
    });
    this.addForm = new FormGroup({
      file: new FormControl(null, Validators.required),
    });
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log("this is a roleid",json.roleID);
    if(json.roleID == 9 || json.roleID == 2){
      this.UploadButton = true;
    this.showButtonOFImageUpload = true;
    }
  }
  
  

  //}
  viewImageAll(){

    this.service.ServiceDocs(this.data.requestId).subscribe((data:any) => {
      
      this.blob = new Blob([data], {type: 'application/zip'});
    
      var downloadURL = window.URL.createObjectURL(this.blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download ="AllDocuments";
      link.click();
    
    },
    (error) => {
      this.service.notify.showError('File Not Found');
      // console.log(error);
    });
    
    // let url = this.apiUrl+"/servicerequest/downloadDocument?type=ServiceDocs&enquiryId="+this.data.requestId;
    // window.open(url, "_blank");

  }
  saveNotes(){
    let saveData = this.addForm.value;
    let reqObj = {
      SRNumber :  this.SRNumber,
      ImageData : saveData.file,
      FileExtension : this.imgName
    }
    console.log(reqObj);
    
    this.service.UploadImageOfIsometricGraph(reqObj).subscribe((response:any)=>{
      if(response.status == "success"){
        this.service.notify.showError('Image upload successfully.');
      }
      this.dialogRef.close();
    })
  //  this.displayModal = false;
    
  }
  showIsometricUploadButton(){
    console.log("this is a clicked");
    
    this.UploadButton = false
    this.showButton = true;
  }
  imgName:any;
  onFileSelected(event:any){
    const files: FileList = event.target.files; 
    const fileName = files[0].name; 
    const fileExtension = fileName.split('.').pop();
    this.imgName = fileExtension; 
    console.log("this is a ectension",this.imgName); 
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
  viewImage(name:any){

    this.service.viewImage(this.data.requestId,name).subscribe((data:any) => {
      
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

 

  cancel() {
    this.dialogRef.close();
  }
}
