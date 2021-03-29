import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  public links: string[] = ["Market", "Equipment", "Login"];
  private _activeLink = "Market";

  constructor(
    private router: Router,
    private _dialogService: MatDialog
    ) { }

  public clickLinkHandler(link: string): void {
    this._activeLink = link;
    this.router.navigateByUrl(this._activeLink.toLocaleLowerCase());
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
}
