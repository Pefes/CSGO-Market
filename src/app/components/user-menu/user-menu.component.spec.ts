import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { DEFAULT_DARK_THEME, DEFAULT_LANGUAGE } from "src/app/data/constants-messages.data";
import { UserData } from "src/app/models/user-data.model";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ThemeService } from "src/app/services/theme.service";
import { UserMenuComponent } from "./user-menu.component";


describe("UserMenuComponent", () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let debug: DebugElement;
  let authenticationService: AuthenticationService;
  let themeService: ThemeService;
  let translateService: TranslateService;
  const userData: UserData = {
    username: "username",
    cash: 100,
    userSettings: { darkTheme: true, language: "en" }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatRadioModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatMenuModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthenticationService },
        { provide: ThemeService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    authenticationService = TestBed.inject(AuthenticationService);
    themeService = TestBed.inject(ThemeService);
    translateService = TestBed.inject(TranslateService);

    spyOn(authenticationService, "getLoggedInUserData").and.returnValue(of(userData));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get user data from api and adjust preferences", () => {
    spyOn(component.darkThemeControl, "setValue").and.callThrough();
    spyOn(component["_themeService"], "setDarkTheme").and.callThrough();
    spyOn(component.languageControl, "setValue").and.callThrough();
    spyOn(component["_translateService"], "setDefaultLang").and.callThrough();
    fixture.detectChanges();

    expect(component.userData).toEqual(userData);
    expect(component.darkThemeControl.setValue).toHaveBeenCalledWith(userData.userSettings?.darkTheme);
    expect(component["_themeService"].setDarkTheme).toHaveBeenCalledWith(userData.userSettings?.darkTheme ?? DEFAULT_DARK_THEME);
    expect(component.languageControl.setValue).toHaveBeenCalledWith(userData.userSettings?.language);
    expect(component["_translateService"].setDefaultLang).toHaveBeenCalledWith(userData.userSettings?.language ?? DEFAULT_LANGUAGE);
  });

  it("should show/hide user menu on button click and animate icon", () => {
    fixture.detectChanges();
    const userButton: DebugElement = debug.query(By.css(".userButton"));
    const userButtonIcon: DebugElement = debug.query(By.css(".userButton mat-icon"));
    expect(component.isMenuOpened).toBeFalsy();
    expect(userButtonIcon.properties["@menuOpened"]).toEqual("closed");

    userButton.nativeElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component.isMenuOpened).toBeTruthy();
    expect(userButtonIcon.properties["@menuOpened"]).toEqual("opened");

    userButton.nativeElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component.isMenuOpened).toBeFalsy();
    expect(userButtonIcon.properties["@menuOpened"]).toEqual("closed");
  });

  it("should set current dark theme on radio group change", () => {
    fixture.detectChanges();
    spyOn(component["_themeService"], "setDarkTheme").and.callThrough();
    spyOn(authenticationService, "saveUserSettings");
    const userButton: DebugElement = debug.query(By.css(".userButton"));
    userButton.nativeElement.dispatchEvent(new Event("click"));
    component.darkThemeControl.setValue(false);
    const darkModeSelection: DebugElement = debug.query(By.css(".darkModeSelection mat-slide-toggle"));
    darkModeSelection.nativeElement.dispatchEvent(new Event("change"));

    expect(component["_themeService"].setDarkTheme).toHaveBeenCalledWith(component.darkThemeControl.value);
    expect(component.userData.userSettings?.darkTheme).toEqual(component.darkThemeControl.value);
    expect(authenticationService.saveUserSettings).toHaveBeenCalledWith(component.userData.userSettings ?? {});
  });

  it("should set current language on radio group change", () => {
    fixture.detectChanges();
    spyOn(component["_translateService"], "setDefaultLang").and.callThrough();
    spyOn(authenticationService, "saveUserSettings");
    const userButton: DebugElement = debug.query(By.css(".userButton"));
    userButton.nativeElement.dispatchEvent(new Event("click"));
    component.languageControl.setValue("pl");
    const languageSelection: DebugElement = debug.query(By.css(".languageSelection mat-radio-group"));
    languageSelection.nativeElement.dispatchEvent(new Event("change"));

    expect(component["_translateService"].setDefaultLang).toHaveBeenCalledWith(component.languageControl.value);
    expect(component.userData.userSettings?.language).toEqual(component.languageControl.value);
    expect(authenticationService.saveUserSettings).toHaveBeenCalledWith(component.userData.userSettings ?? {});
  });

  it("should log out user when logout button clicked", () => {
    fixture.detectChanges();
    spyOn(authenticationService, "logOut");
    const userButton: DebugElement = debug.query(By.css(".userButton"));
    userButton.nativeElement.dispatchEvent(new Event("click"));
    const logOutButton: DebugElement = debug.query(By.css(".logOutButton"));
    logOutButton.nativeElement.dispatchEvent(new Event("click"));
    expect(authenticationService.logOut).toHaveBeenCalled();
  });
});
