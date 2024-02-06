import { Component } from '@angular/core';
import { AuthService } from 'src/app/library/shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Elev9App';
  userName = '';
  constructor(readonly authService: AuthService) { }

  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (this.authService.currentUserValue && this.authService.currentUserValue.id) {
      this.userName = this.authService.currentUserValue.firstName;
    } else {
      this.userName = '';
    }
  }
}
