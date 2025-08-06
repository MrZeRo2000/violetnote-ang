import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private snackBar = inject(MatSnackBar);

  public showSnackBar(message: string, severity: string | undefined = undefined) {
    const config = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    } as  MatSnackBarConfig

    if (!!severity) {
      config.panelClass = `custom-snackbar-${severity}`
    }
    console.info(`Opening snackbar with config: ${JSON.stringify(config)} message: ${message}`);
    this.snackBar.open(message, '', config);
  }

  public showSuccess(message: string) {
    this.showSnackBar(message)
  }

  public showError(message: string) {
    this.showSnackBar(message, "error")
  }

  public dismiss() {
    this.snackBar.dismiss();
  }
}
