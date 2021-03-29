import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LOGIN, REGISTER } from "src/app/data/variables-messages.data";
import { LoginDialogData } from "src/app/models/login-dialog-data.model";

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
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData
  ) {
    data.login ? this.login = data.login : null;
  }

  public getLabel(): string {
    return this.login ? LOGIN : REGISTER;
  }

  public loginButtonHandler(): void {
    this.dialogRef.close(true);
  }

  public cancelButtonHandler(): void {
    this.dialogRef.close();
  }

}
