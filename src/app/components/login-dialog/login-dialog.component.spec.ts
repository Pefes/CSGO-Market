import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { HttpLoaderFactory } from "src/app/app.module";
import { DEFAULT_LANGUAGE, LOGIN_LABEL, REGISTER_LABEL, SUCCESS } from "src/app/data/constants-messages.data";
import { AuthenticationService } from "src/app/services/authentication.service";
import { LoginDialogComponent } from "./login-dialog.component";

describe("LoginDialogComponent", () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  let debug: DebugElement;
  let authenticationService: AuthenticationService;
  let dialogService: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDialogComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          defaultLanguage: DEFAULT_LANGUAGE,
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: AuthenticationService },
        { provide: MatDialog }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    authenticationService = TestBed.inject(AuthenticationService);
    dialogService = TestBed.inject(MatDialog);
    spyOn(authenticationService, "logIn").and.returnValue(of({ status: SUCCESS }));
    spyOn(authenticationService, "register").and.returnValue(of({ status: SUCCESS }));
    spyOn(dialogService, "open");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set proper dialog labels", () => {
    expect(component.getLabel()).toEqual(LOGIN_LABEL);
    component.login = false;
    expect(component.getLabel()).toEqual(REGISTER_LABEL);
  });

  it("should login when user submit login dialog", () => {
    const submitButton: DebugElement = debug.query(By.css(".submitButton"));
    submitButton.nativeElement.dispatchEvent(new Event("click"));
    expect(authenticationService.logIn).toHaveBeenCalled();
  });

  it("should register when user submit register dialog", () => {
    component.login = false;
    const submitButton: DebugElement = debug.query(By.css(".submitButton"));
    submitButton.nativeElement.dispatchEvent(new Event("click"));
    expect(authenticationService.register).toHaveBeenCalled();
  });

  it("should close dialog when user click cancel button", () => {
    spyOn(component.dialogRef, "close");
    const cancelButton: DebugElement = debug.query(By.css(".cancelButton"));
    cancelButton.nativeElement.dispatchEvent(new Event("click"));
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it("should open success dialog when login/register was successful", () => {
    component.submitButtonHandler();
    expect(dialogService.open).toHaveBeenCalled();

    component.login = false;
    component.submitButtonHandler();
    expect(dialogService.open).toHaveBeenCalled();
  });
});
