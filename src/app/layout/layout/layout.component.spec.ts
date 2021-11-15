import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { LastOpenedItemsListComponent } from "src/app/components/last-opened-items-list/last-opened-items-list.component";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { LayoutComponent } from "./layout.component";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let debug: DebugElement;
  let breakpointObserver: BreakpointObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent, LastOpenedItemsListComponent, NavbarComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDividerModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot()
      ],
      providers: [{ provide: BreakpointObserver }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    breakpointObserver = TestBed.inject(BreakpointObserver);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show side nav when breakpoint observer does not match", () => {
    spyOn(breakpointObserver, "observe").and.returnValue(of({ matches: false, breakpoints: {} }));
    fixture.detectChanges();

    const lastOpenedItemsList: DebugElement = debug.query(By.css("last-opened-items-list"));
    expect(lastOpenedItemsList).toBeDefined();
  });

  it("should hide side nav when breakpoint observer matches", () => {
    spyOn(breakpointObserver, "observe").and.returnValue(of({ matches: true, breakpoints: {} }));
    fixture.detectChanges();

    const lastOpenedItemsList: DebugElement = debug.query(By.css("last-opened-items-list"));
    expect(lastOpenedItemsList).toBeNull();
  });
});
