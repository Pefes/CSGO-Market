import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
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

  public form: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  public login: boolean = true;

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
    const username = this.form.value.username;
    const password = this.form.value.password;

    if (this.login) {
      this._authenticationService.logIn(username, password).subscribe()
    } else {
      this._authenticationService.register(username, password).subscribe();
    }

    this.dialogRef.close(true);
  }

  public cancelButtonHandler(): void {
    this.dialogRef.close();
  }

}
