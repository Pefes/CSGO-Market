import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LOGIN, LOGIN_SUCCESS, REGISTER, REGISTER_SUCCESS, SUCCESS, SUCCESS_TITLE } from "src/app/data/constants-messages.data";
import { LoginDialogData } from "src/app/models/login-dialog-data.model";
import { AuthenticationService } from "src/app/services/authentication.service";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";

@Component({
  selector: "login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"]
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
    private _authenticationService: AuthenticationService,
    private _dialogService: MatDialog
  ) {
    this.login = data.login ?? true;
  }

  public getLabel(): string {
    return this.login ? LOGIN : REGISTER;
  }

  private _openSuccessDialog(): void {
    this._dialogService.open(YesNoDialogComponent, { data: {
      title: SUCCESS_TITLE,
      contentText: this.login ? LOGIN_SUCCESS : REGISTER_SUCCESS,
      showYesButton: false,
      showNoButton: false
    }});
  }

  public submitButtonHandler(): void {
    const username = this.form.value.username;
    const password = this.form.value.password;

    if (this.login) {
      this._authenticationService.logIn(username, password).subscribe(response => {
        if (response.status === SUCCESS) {
          this._openSuccessDialog();
        }
      });
    } else {
      this._authenticationService.register(username, password).subscribe(response => {
        if (response.status === SUCCESS) {
          this._openSuccessDialog();
        }
      });
    }

    this.dialogRef.close(true);
  }

  public cancelButtonHandler(): void {
    this.dialogRef.close();
  }

}
