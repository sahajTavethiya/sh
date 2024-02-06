import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(readonly snackbar: MatSnackBar,
    readonly zone: NgZone) { }

  showError(message: string) {
    this.zone.run(() => {
      this.snackbar.open(message, 'X', { panelClass: ['error'] });
    })
  }

  showDefaultError() {
    this.zone.run(() => {
      this.snackbar.open('Please enter all required fields', 'X', { panelClass: ['error'] });
    })
  }

  showSuccess(message: string) {
    this.zone.run(() => {
      this.snackbar.open(message, 'X', { panelClass: ['success'] });
    })
  }
}
