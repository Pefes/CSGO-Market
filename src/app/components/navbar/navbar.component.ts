import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UserData } from "src/app/models/user-data.model";
import { AuthenticationService } from "src/app/services/authentication.service";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  public links: string[] = ["Market", "Equipment"];
  private _activeLink = "Market";
  public loggedInUserData: UserData | null = null;

  constructor(
    private _router: Router,
    private _dialogService: MatDialog,
    private _authenticationService: AuthenticationService
  ) {
    this._authenticationService.getLoggedInUserData().subscribe(userData => {
      this.loggedInUserData = userData;
    });
  }

  public clickLinkHandler(link: string): void {
    this._activeLink = link;
    this._router.navigateByUrl(this._activeLink.toLocaleLowerCase());
  }

  public isActive(link: string): boolean {
    return this._activeLink === link;
  }

  public loginButtonHandler(): void {
    const dialogRef = this._dialogService.open(LoginDialogComponent, { data: { login: true } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public registerButtonHandler(): void {
    const dialogRef = this._dialogService.open(LoginDialogComponent, { data: { login: false } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public logoutButtonHandler(): void {
    this._authenticationService.logout();
  }

  public isLoggedIn(): boolean {
    return this._authenticationService.isLoggedIn();
  }
}
