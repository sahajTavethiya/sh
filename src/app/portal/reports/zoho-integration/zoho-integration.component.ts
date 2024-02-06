import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-zoho-integration',
  templateUrl: './zoho-integration.component.html',
  styleUrls: ['./zoho-integration.component.scss']
})
export class ZohoIntegrationComponent implements OnInit {

  constructor(readonly service: ReportsService) { }

  ngOnInit(): void {
  }
  callZoho(){
    window.open('https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.WJVR8PM7YZMMWPXEPLBCVK1ZLV1F9M&scope=email&redirect_uri=http://103.251.94.95:806', '_blank');
    // this.service.zohoLogin().subscribe((data:any)=>{
    // console.log("this is a data",data);
    // })
  }
}
