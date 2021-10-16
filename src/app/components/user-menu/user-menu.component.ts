import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { UserData } from "src/app/models/user-data.model";
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
  public userData: UserData = {};
  public darkThemeControl: FormControl = new FormControl(true);
  public languageControl: FormControl = new FormControl("en");

  constructor(
    private _authenticationService: AuthenticationService,
    private _themeService: ThemeService,
    private _translateService: TranslateService) {
    this._authenticationService.getLoggedInUserData().subscribe(userData => {
      this.userData = { ...userData };
      this.darkThemeControl.setValue(userData?.userSettings?.darkTheme ?? true);
      this._themeService.setDarkTheme(this.darkThemeControl.value);
      this.languageControl.setValue(userData?.userSettings?.language ?? "en");
      this._translateService.setDefaultLang(this.languageControl.value);
    });
  }

  public menuEventHandler(opened: boolean): void {
    this.isMenuOpened = opened;
  }

  public logOutButtonHandler(): void {
    this._authenticationService.logOut();
  }

  public themeChangedHandler(): void {
    this._themeService.setDarkTheme(this.darkThemeControl.value);
    if (this.userData.userSettings) {
      this.userData.userSettings.darkTheme = this.darkThemeControl.value;
      this._authenticationService.saveUserSettings(this.userData.userSettings);
    }
  }

  public languageChangedHandler(): void {
    this._translateService.setDefaultLang(this.languageControl.value);
    if (this.userData.userSettings) {
      this.userData.userSettings.language = this.languageControl.value;
      this._authenticationService.saveUserSettings(this.userData.userSettings);
    }
  }
}
