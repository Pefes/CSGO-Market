import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ThemeService } from "src/app/services/theme.service";

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
  public darkTheme: boolean = true;
  public currentUsername: string = "";
  public language: string = "en";

  constructor(
    private _authenticationService: AuthenticationService,
    private _themeService: ThemeService,
    private _translateService: TranslateService) {
    this._authenticationService.getLoggedInUserData().subscribe(userData => {
      this.currentUsername = userData?.username ?? "user";
      this.darkTheme = userData?.darkTheme ?? true;
      this._themeService.setDarkTheme(this.darkTheme);
    });
  }

  public menuEventHandler(opened: boolean): void {
    this.isMenuOpened = opened;
  }

  public logOutButtonHandler(): void {
    this._authenticationService.logOut();
  }

  public themeChangedHandler(event: MatSlideToggleChange): void {
    this._authenticationService.setUserDarkTheme(event.checked);
    this._themeService.setDarkTheme(event.checked);
  }

  public languageChangedHandler(): void {
    console.log(this.language)
    this._translateService.setDefaultLang(this.language);
  }
}
