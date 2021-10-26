import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { SUCCESS } from "src/app/data/constants-messages.data";
import { ApiService } from "src/app/services/api.service";
import { AutocompleteFormFieldComponent } from "./autocomplete-form-field.component";


describe("AutocompleteFormFieldComponent", () => {
  let component: AutocompleteFormFieldComponent;
  let fixture: ComponentFixture<AutocompleteFormFieldComponent>;
  let debug: DebugElement;
  let apiService: ApiService;
  const apiResponseOptions: any = { status: SUCCESS, data: ["option1", "option2", "option3"] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteFormFieldComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ApiService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteFormFieldComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;

    apiService = TestBed.inject(ApiService);
    spyOn(apiService, "getAutocompleteOptions").and.returnValue(of(apiResponseOptions));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set form control from input", async () => {
    const newFormControl: FormControl = new FormControl("newFormControl");
    const input: DebugElement = debug.query(By.css("input"));
    component.formFieldControl = newFormControl;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.nativeElement.value).toEqual("newFormControl");
  });

  it("should get autocomplete options from api for given property", () => {
    component.acProperty = "customProperty";
    fixture.detectChanges();
    expect(apiService.getAutocompleteOptions).toHaveBeenCalledWith("customProperty");
    expect(component.acOptions.length).toEqual(apiResponseOptions.data.length);
  });

  it("should generate autocomplete option elements", () => {
    component.acProperty = "customProperty";
    fixture.detectChanges();

    const input: DebugElement = debug.query(By.css("input"));
    input.nativeElement.dispatchEvent(new Event("focusin"));
    fixture.detectChanges();

    const autocompleteOptions: DebugElement[] = debug.queryAll(By.css("mat-option"));
    expect(autocompleteOptions.length).toEqual(apiResponseOptions.data.length);
  });

  it("should filter options when user type data into input", () => {
    component.acProperty = "customProperty";
    component.formFieldControl = new FormControl("");
    fixture.detectChanges();
    component.formFieldControl.setValue("1");
    fixture.detectChanges();
    expect(component.filteredAcOptions.length).toEqual(1);
  });

  it("should generate only filtered option elements", () => {
    component.acProperty = "customProperty";
    component.formFieldControl = new FormControl("");
    fixture.detectChanges();
    component.formFieldControl.setValue("1");
    fixture.detectChanges();

    const input: DebugElement = debug.query(By.css("input"));
    input.nativeElement.dispatchEvent(new Event("focusin"));
    fixture.detectChanges();

    const autocompleteOptions: DebugElement[] = debug.queryAll(By.css("mat-option"));
    expect(autocompleteOptions.length).toEqual(1);
  });

  it("should hide clear icon when input is empty", () => {
    fixture.detectChanges();
    const matIcon: DebugElement = debug.query(By.css("mat-icon"));
    expect(component.formFieldControl.value).toEqual("")
    expect(matIcon.nativeElement.classList).toContain("hideCloseIcon");
  });

  it("should show clear icon when input has value", () => {
    component.formFieldControl.setValue("customValue");
    fixture.detectChanges();
    const matIcon: DebugElement = debug.query(By.css("mat-icon"));
    expect(matIcon.nativeElement.classList).not.toContain("hideCloseIcon");
  });
  
  it("should clear form control when user click remove icon", () => {
    spyOn(component, "clearFormFieldHandler").and.callThrough();
    fixture.detectChanges();
    const clearIcon: DebugElement = debug.query(By.css("mat-icon"));
    component.formFieldControl.setValue("customValue");
    clearIcon.nativeElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component.formFieldControl.value).toEqual("");
    expect(component.clearFormFieldHandler).toHaveBeenCalled();
  });
});
