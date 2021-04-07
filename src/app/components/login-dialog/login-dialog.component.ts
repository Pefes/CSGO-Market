import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LOGIN, REGISTER } from "src/app/data/variables-messages.data";
import { LoginDialogData } from "src/app/models/login-dialog-data.model";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  public login: boolean = true;
  public username: string = "";
  public password: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private _authenticationService: AuthenticationService
  ) {
    this.login = data.login ?? true;
  }

  public getLabel(): string {
    return this.login ? LOGIN : REGISTER;
  }

  public submitButtonHandler(): void {
    if (this.login) {
      this._authenticationService.login(this.username, this.password).subscribe(console.log)
    } else {
      this._authenticationService.register(this.username, this.password).subscribe(console.log);
    }
    this.dialogRef.close(true);
  }

  public cancelButtonHandler(): void {
    this.dialogRef.close();
  }

}
