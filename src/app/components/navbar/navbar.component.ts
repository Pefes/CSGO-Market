import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { EQUIPMENT_URL, MARKET_URL, TRY_OUT_URL } from "src/app/data/variables-messages.data";
import { UserData } from "src/app/models/user-data.model";
import { AuthenticationService } from "src/app/services/authentication.service";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  
  public links: { linkName: string, url: string, mustBeLoggedIn: boolean }[] = [
    { linkName: "Market", url: MARKET_URL, mustBeLoggedIn: false },
    { linkName: "Equipment", url: EQUIPMENT_URL, mustBeLoggedIn: true },
    { linkName: "Try Out!", url: TRY_OUT_URL, mustBeLoggedIn: false }
  ];
  private _activeLink: string = MARKET_URL;
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

  public showLink(mustBeLoggedIn: boolean): boolean {
    return !mustBeLoggedIn || this.isLoggedIn();
  }

  public clickLinkHandler(url: string): void {
    this._activeLink = url;
    this._router.navigateByUrl(this._activeLink);
  }

  public isActive(url: string): boolean {
    return this._router.url === `/${ url }`;
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
    this._authenticationService.logOut();
  }

  public isLoggedIn(): boolean {
    return this._authenticationService.isLoggedIn();
  }
}
