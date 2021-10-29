import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { YesNoDialogData } from "src/app/models/yes-no-dialog-data.model";
import { YesNoDialogComponent } from "./yes-no-dialog.component";


describe("YesNoDialogComponent", () => {
  let component: YesNoDialogComponent;
  let fixture: ComponentFixture<YesNoDialogComponent>;
  let debug: DebugElement;
  const yesNoDialogData: YesNoDialogData = {
    title: "title",
    contentText: "contentText",
    showYesButton: true,
    showNoButton: true,
    showCancelButton: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YesNoDialogComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { data: yesNoDialogData } },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoDialogComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show buttons when needed", () => {
    const yesButton: DebugElement = debug.query(By.css(".yesButton"));
    const noButton: DebugElement = debug.query(By.css(".noButton"));
    const cancelButton: DebugElement = debug.query(By.css(".cancelButton"));
    expect(yesButton).toBeDefined();
    expect(noButton).toBeDefined();
    expect(cancelButton).toBeDefined();
  });

  it("should hide buttons when needed", () => {
    component.showYesButton = false;
    component.showNoButton = false;
    component.showCancelButton = false;
    fixture.detectChanges();
    const yesButton: DebugElement = debug.query(By.css(".yesButton"));
    const noButton: DebugElement = debug.query(By.css(".noButton"));
    const cancelButton: DebugElement = debug.query(By.css(".cancelButton"));
    expect(yesButton).toBeNull();
    expect(noButton).toBeNull();
    expect(cancelButton).toBeNull();
  });

  it("should close dialog with proper value when user click button", () => {
    spyOn(component.dialogRef, "close");
    const yesButton: DebugElement = debug.query(By.css(".yesButton"));
    const noButton: DebugElement = debug.query(By.css(".noButton"));
    const cancelButton: DebugElement = debug.query(By.css(".cancelButton"));

    yesButton.nativeElement.dispatchEvent(new Event("click"));
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);

    noButton.nativeElement.dispatchEvent(new Event("click"));
    expect(component.dialogRef.close).toHaveBeenCalledWith(false);

    cancelButton.nativeElement.dispatchEvent(new Event("click"));
    expect(component.dialogRef.close).toHaveBeenCalledWith(null);
  });
});
