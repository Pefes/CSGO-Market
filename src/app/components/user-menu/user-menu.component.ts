import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { DEFAULT_DARK_THEME, DEFAULT_LANGUAGE } from "src/app/data/constants-messages.data";
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
export class UserMenuComponent implements OnInit {

  public isMenuOpened: boolean = false;
  public userData: UserData = {};
  public darkThemeControl: FormControl = new FormControl(DEFAULT_DARK_THEME);
  public languageControl: FormControl = new FormControl(DEFAULT_LANGUAGE);

  constructor(
    private _authenticationService: AuthenticationService,
    private _themeService: ThemeService,
    private _translateService: TranslateService) {}

  public ngOnInit(): void {
    this._authenticationService.getLoggedInUserData().subscribe(userData => {
      this.userData = { ...userData };
      this.darkThemeControl.setValue(userData?.userSettings?.darkTheme ?? DEFAULT_DARK_THEME);
      this._themeService.setDarkTheme(this.darkThemeControl.value);
      this.languageControl.setValue(userData?.userSettings?.language ?? DEFAULT_LANGUAGE);
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
    if (!this.userData.userSettings) {
      this.userData.userSettings = {};
    }
    this.userData.userSettings.darkTheme = this.darkThemeControl.value;
    this._authenticationService.saveUserSettings(this.userData.userSettings);
  }

  public languageChangedHandler(): void {
    this._translateService.setDefaultLang(this.languageControl.value);
    if (!this.userData.userSettings) {
      this.userData.userSettings = {};
    }
    this.userData.userSettings.language = this.languageControl.value;
    this._authenticationService.saveUserSettings(this.userData.userSettings);
  }
}
