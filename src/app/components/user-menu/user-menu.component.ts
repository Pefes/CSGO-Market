import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
  animations: [
    trigger("menuOpened", [
      state("opened", style({ transform: "rotate(180deg)" })),
      state("closed", style({ transform: "rotate(360deg)" })),
      transition("opened <=> closed", [animate("250ms ease-out")])
    ])
  ]
})
export class UserMenuComponent {

  public isMenuOpened: boolean = false;
  public currentUsername: string = "";

  constructor(private _authenticationService: AuthenticationService) {
    this._authenticationService.getLoggedInUserData().subscribe(userData => {
      this.currentUsername = userData?.username ?? "user";
    });
  }

  public menuEventHandler(opened: boolean): void {
    this.isMenuOpened = opened;
  }

  public logOutButtonHandler(): void {
    this._authenticationService.logOut();
  }
}
