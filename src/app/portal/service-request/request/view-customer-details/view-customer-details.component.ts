import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EnquiryTaskLine } from 'src/app/library/core/models/service-request/enquiry-task-line.model';
import { environment } from 'src/environments/environment';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.scss']
})
export class ViewCustomerDetailsComponent implements OnInit {
  ViewImageForm: FormGroup;
  @Input() requestId: any;
  @Input() requestForm: FormGroup;
  
  apiUrl: string = environment.apiUrl;

  clientAddressDetail: any = {};
  clientMaster: any = {};
  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: number ,requestId:number,customerId:number },
    public dialogRef: MatDialogRef<ViewCustomerDetailsComponent>) { }

  ngOnInit(): void {
    this.initialize();
    console.log(this.data.customerId)
    const data ={
      "enquiryId": this.data.requestId,
      "customerId": null
    }

    this.service.getCustomer(data).subscribe((response: any) => {
      if (response.status == 'success') {
        console.log('response.data');
        console.log(response.data);
        if(response.data){
          console.log('response.data ');
          console.log(response.data.clientAddressDetail);
          this.clientAddressDetail = response.data.clientAddressDetail;
          this.clientMaster = response.data.clientMaster;

        }else{
        }

        
      }
    });
  }
  viewImage(){
    // console.log();

  }


  initialize() {
  }

  

 
  cancel() {
    this.dialogRef.close();
  }
}
