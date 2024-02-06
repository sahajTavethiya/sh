import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddCustomerService } from '../add-customer/add-customer.service';
@Component({
  selector: 'app-add-user-contact-detail',
  templateUrl: './add-user-contact-detail.component.html',
  styleUrls: ['./add-user-contact-detail.component.scss']
})
export class AddUserContactDetailComponent implements OnInit {
  @Input() requestForm: FormGroup;
  constructor(readonly service: AddCustomerService) { }

  AllCity : any = [];
  AllCountry : any = [];
  AllState : any = [];
  ngOnInit(): void {
    this.service.getAllActiveZoneCityCountry().subscribe((data:any)=>{
      this.AllCity = data.data.data.allActiveCity; 
      this.AllCountry = data.data.data.allActiveCountry;
      this.AllState = data.data.data.allActiveState ;
    
   })         
  }
  public get RequestDetail() {
    return this.requestForm.controls.request as FormGroup;
  }

}
