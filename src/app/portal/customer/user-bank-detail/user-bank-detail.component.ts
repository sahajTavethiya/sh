import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-user-bank-detail',
  templateUrl: './user-bank-detail.component.html',
  styleUrls: ['./user-bank-detail.component.scss']
})
export class UserBankDetailComponent implements OnInit {
  @Input() requestForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  public get RequestDetail() {
    return this.requestForm.controls.request as FormGroup;
  }
  onFileSelected(event: any,FileName:any){
  
      const files: FileList = event.target.files; 
      
      if (files.length > 0) {
        const file = files[0]; 
        const extension = file.name.split('.').pop();
        let imgName = `${FileName}.${extension}`; 
                
        const reader :any = new FileReader();
        reader.onload = () => {
           const base64String = reader.result.toString().split(',')[1];
           if(FileName == 'Scannedcheque'){
            this.requestForm.controls.request.get('ScannedchequeFile')?.setValue(base64String);
            this.requestForm.controls.request.get('ScannedchequeName')?.setValue(imgName);
          }         
        };
        reader.readAsDataURL(file);
      }
    }
}
