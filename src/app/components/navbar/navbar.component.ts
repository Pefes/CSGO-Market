import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  public links: string[] = ["Home", "Dashboard", "Login"];
  private _activeLink = "Home";

  constructor(private router: Router) { }

  public clickLinkHandler(link: string): void {
    this._activeLink = link;
    this.router.navigateByUrl(this._activeLink.toLocaleLowerCase());
  }

  public isActive(link: string): boolean {
    return this._activeLink === link;
  }
}