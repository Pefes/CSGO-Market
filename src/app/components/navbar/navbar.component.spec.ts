import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { TabLink } from "src/app/models/tab-link.model";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserData } from "../../models/user-data.model";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";
import { SnakeBorderCardComponent } from "../snake-border-card/snake-border-card.component";
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { NavbarComponent } from "./navbar.component";


describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let debug: DebugElement;
  let dialogService: MatDialog;
  let authenticationService: AuthenticationService;
  let router: Router;
  const userData: UserData = {
    username: "username",
    cash: 100,
    userSettings: { darkTheme: true, language: "pl" }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, SnakeBorderCardComponent, UserMenuComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        HttpClientModule,
        MatDividerModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,
        MatMenuModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthenticationService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(MatDialog);
    authenticationService = TestBed.inject(AuthenticationService);
    spyOn(router, "navigateByUrl");
    spyOn(dialogService, "open").and.callThrough();
    spyOn(authenticationService, "getLoggedInUserData").and.returnValue(of(userData));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should hide links only allowed for logged in users when current user is not logged in", () => {
    spyOn(authenticationService, "isLoggedIn").and.returnValue(false);
    fixture.detectChanges();
    const links: DebugElement[] = debug.queryAll(By.css(".singleLinkWrapper a"));
    expect(links).toHaveSize(component.links.filter((link: TabLink) => !link.mustBeLoggedIn).length);
  });

  it("should show links allowed for logged in users when current user is logged in", () => {
    spyOn(authenticationService, "isLoggedIn").and.returnValue(true);
    fixture.detectChanges();
    const links: DebugElement[] = debug.queryAll(By.css(".singleLinkWrapper a"));
    expect(links).toHaveSize(component.links.length);
  });

  it("should change url when user click tab", () => {
    fixture.detectChanges();
    const links: DebugElement[] = debug.queryAll(By.css(".singleLinkWrapper a"));
    links[0].nativeElement.dispatchEvent(new Event("click"));
    expect(router.navigateByUrl).toHaveBeenCalledWith(component.links[0].url);
  });

  it("should show cash and user menu only for logged in user", () => {
    spyOn(authenticationService, "isLoggedIn").and.returnValue(false);
    fixture.detectChanges();
    let cashCard: DebugElement = debug.query(By.css("snake-border-card"));
    let userMenu: DebugElement = debug.query(By.css("user-menu"));
    expect(cashCard).toBeNull();
    expect(userMenu).toBeNull();

    authenticationService.isLoggedIn = jasmine.createSpy().and.returnValue(true);
    fixture.detectChanges();
    cashCard = debug.query(By.css("snake-border-card"));
    userMenu = debug.query(By.css("user-menu"));
    expect(cashCard).toBeDefined();
    expect(userMenu).toBeDefined();
  });

  it("should show login/register buttons only for logged in user", () => {
    spyOn(authenticationService, "isLoggedIn").and.returnValue(false);
    fixture.detectChanges();
    let loginButton: DebugElement = debug.query(By.css(".loginButton"));
    let registerButton: DebugElement = debug.query(By.css(".registerButton"));
    expect(loginButton).toBeDefined();
    expect(registerButton).toBeDefined();

    authenticationService.isLoggedIn = jasmine.createSpy().and.returnValue(true);
    fixture.detectChanges();
    loginButton = debug.query(By.css(".loginButton"));
    registerButton = debug.query(By.css(".registerButton"));
    expect(loginButton).toBeNull();
    expect(registerButton).toBeNull();
  });

  it("should open login dialog when user click login", () => {
    spyOn(authenticationService, "isLoggedIn").and.returnValue(false);
    fixture.detectChanges();
    const loginButton: DebugElement = debug.query(By.css(".loginButton"));
    loginButton.nativeElement.dispatchEvent(new Event("click"));
    expect(dialogService.open).toHaveBeenCalledWith(LoginDialogComponent, { data: { login: true } });
  });

  it("should open register dialog when user click register", () => {
    spyOn(authenticationService, "isLoggedIn").and.returnValue(false);
    fixture.detectChanges();
    const registerButton: DebugElement = debug.query(By.css(".registerButton"));
    registerButton.nativeElement.dispatchEvent(new Event("click"));
    expect(dialogService.open).toHaveBeenCalledWith(LoginDialogComponent, { data: { login: false } });
  });
});
