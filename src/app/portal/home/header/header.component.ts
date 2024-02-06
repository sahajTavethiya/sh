import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { SRDashboardService } from '../../service-request/srdashboard/srdashboard.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName = '';
  oldUrl: string = environment.oldUrl;
   urlAPP =this.oldUrl+'/Account/LoginApp?page='
  constructor(readonly authService: AuthService, readonly router: Router,readonly dialog: MatDialog
    ,readonly service: SRDashboardService,) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(value => {
      this.initialize();
    });
    this.initialize();
  }

  initialize() {
    if (this.authService.currentUserValue && this.authService.currentUserValue.id) {
      this.userName = this.authService.currentUserValue.firstName;
    } else {
      this.userName = '';
    }
  }

  logout() {
    this.authService.logout();
    let url = this.oldUrl+"/Account/LogOutApp";
    console.log(url);
    window.open(url,"_self");
    // window.location.reload();
    // this.router.navigate(['/login']);
  }
  changePassword(){
      const dialogRef = this.dialog.open(ChangePasswordComponent, {
        data: { enquiryData: 1},
        width: '800px',
        // height: '500px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
          
      });
  }

  oldAppClick(URL:any)
  {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if(json.id){
     let urlapp =  this.urlAPP+URL+"&token="+this.authService.currentUserValue.token;
      window.open(urlapp,"_blank");
    }else{
      window.location.reload();
      // this.router.navigate(['/login']);;
      console.log(json)
    }
  } 
}
