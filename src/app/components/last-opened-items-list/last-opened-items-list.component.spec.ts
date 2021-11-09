import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { GET_LAST_OPENED_ITEMS_INTERVAL, SUCCESS } from "src/app/data/constants-messages.data";
import { BackgroundColorDirective } from "src/app/directives/background-color.directive";
import { LastOpenedItem } from "src/app/models/last-opened-item.model";
import { ApiService } from "src/app/services/api.service";
import { ImageContainerComponent } from "../image-container/image-container.component";
import { LastOpenedItemComponent } from "../last-opened-item/last-opened-item.component";
import { LastOpenedItemsListComponent } from "./last-opened-items-list.component";


describe("LastOpenedItemsListComponent", () => {
  let component: LastOpenedItemsListComponent;
  let fixture: ComponentFixture<LastOpenedItemsListComponent>;
  let debug: DebugElement;
  let apiService: ApiService;
  const lastOpenedItems: LastOpenedItem[] = [
    { id: "1", containerName: "customValue", containerIconUrl: "customValue", itemIconUrl: "customValue", itemName: "customValue", itemType: "customValue", itemExterior: "customValue", itemRarity: "customValue", itemRarityColor: "customValue", itemPrice: 10, ownerUsername: "customValue", openedDate: new Date() },
    { id: "2", containerName: "customValue", containerIconUrl: "customValue", itemIconUrl: "customValue", itemName: "customValue", itemType: "customValue", itemExterior: "customValue", itemRarity: "customValue", itemRarityColor: "customValue", itemPrice: 10, ownerUsername: "customValue", openedDate: new Date() },
    { id: "3", containerName: "customValue", containerIconUrl: "customValue", itemIconUrl: "customValue", itemName: "customValue", itemType: "customValue", itemExterior: "customValue", itemRarity: "customValue", itemRarityColor: "customValue", itemPrice: 10, ownerUsername: "customValue", openedDate: new Date() }
  ];

  const additionalLastOpenedItem: LastOpenedItem = { id: "4", containerName: "customValue", containerIconUrl: "customValue", itemIconUrl: "customValue", itemName: "customValue", itemType: "customValue", itemExterior: "customValue", itemRarity: "customValue", itemRarityColor: "customValue", itemPrice: 10, ownerUsername: "customValue", openedDate: new Date() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastOpenedItemsListComponent, LastOpenedItemComponent, ImageContainerComponent, BackgroundColorDirective],
      imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule, MatIconModule, MatProgressSpinnerModule, TranslateModule.forRoot()],
      providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastOpenedItemsListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    apiService = TestBed.inject(ApiService);
    spyOn(apiService, "getLastOpenedItems").and.returnValue(of({ status: SUCCESS, data: lastOpenedItems }));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show spinner on init", () => {
    fixture.detectChanges();
    const spinner: DebugElement = debug.query(By.css("mat-spinner"));
    expect(spinner).toBeDefined();
  });

  it("should show side menu on init", () => {
    fixture.detectChanges();
    const listWrapper: DebugElement = debug.query(By.css(".lastOpenedItemsListWrapper"));
    const toggleIcons: DebugElement[] = debug.queryAll(By.css(".toggleButton mat-icon"));
    expect(listWrapper.properties["@sideMenuToggle"]).toEqual("opened");
    toggleIcons.forEach((toggleIcon: DebugElement) => {
      expect(toggleIcon.properties["@sideMenuToggle"]).toEqual("toggleButtonOpened");
    });
  });

  it("should hide side menu when user click hide button", () => {
    fixture.detectChanges();
    const listWrapper: DebugElement = debug.query(By.css(".lastOpenedItemsListWrapper"));
    const toggleIcons: DebugElement[] = debug.queryAll(By.css(".toggleButton mat-icon"));
    const toggleButton: DebugElement = debug.query(By.css(".toggleButton"));
    toggleButton.nativeElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    expect(listWrapper.properties["@sideMenuToggle"]).toEqual("closed");
    toggleIcons.forEach((toggleIcon: DebugElement) => {
      expect(toggleIcon.properties["@sideMenuToggle"]).toEqual("toggleButtonClosed");
    });
  });

  it("should get data from api", fakeAsync(() => {
    fixture.detectChanges();
    tick(GET_LAST_OPENED_ITEMS_INTERVAL);
    expect(component.lastOpenedItems).toHaveSize(3);
    discardPeriodicTasks();
  }));

  it("should enable enter item animation when data came from api second time", fakeAsync(() => {
    expect(component.disableAnimations).toBeTruthy();
    fixture.detectChanges();
    tick(2 * GET_LAST_OPENED_ITEMS_INTERVAL);
    expect(component.disableAnimations).toBeFalsy();
    discardPeriodicTasks();
  }));

  it("should add only one new item when other already exists added", fakeAsync(() => {
    fixture.detectChanges();
    tick(GET_LAST_OPENED_ITEMS_INTERVAL);

    apiService.getLastOpenedItems = jasmine.createSpy().and.returnValue(of({
      status: SUCCESS,
      data: [additionalLastOpenedItem, ...lastOpenedItems]
    }));

    tick(GET_LAST_OPENED_ITEMS_INTERVAL);
    expect(component.lastOpenedItems).toHaveSize(4);
    expect(component.lastOpenedItems).toEqual([additionalLastOpenedItem, ...lastOpenedItems.reverse()]);
    discardPeriodicTasks();
  }));
});
