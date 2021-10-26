import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { HttpLoaderFactory } from "src/app/app.module";
import { DEFAULT_LANGUAGE, SUCCESS } from "src/app/data/constants-messages.data";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ItemsService } from "src/app/services/items.service";
import { ItemListComponent } from "./item-list.component";


describe("ItemListComponent", () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let debug: DebugElement;
  let dialogService: MatDialog;
  let apiService: ApiService;
  let itemsService: ItemsService;
  let authenticationService: AuthenticationService;
  const itemsData: Item[] = [
    { _id: "id", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
    { _id: "id", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
    { _id: "id", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
    { _id: "id", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      imports: [
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatIconModule,
        TranslateModule.forRoot({
          defaultLanguage: DEFAULT_LANGUAGE,
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        { provide: ApiService },
        { provide: ItemsService },
        { provide: AuthenticationService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    dialogService = TestBed.inject(MatDialog);
    apiService = TestBed.inject(ApiService);
    itemsService = TestBed.inject(ItemsService);
    authenticationService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show spinner and hide items when data is loading", () => {
    const spinner: DebugElement = debug.query(By.css(".spinnerWrapper"));
    const items: DebugElement = debug.query(By.css(".itemsWrapper"));
    expect(component.itemsLoading).toBeTruthy();
    expect(spinner).toBeDefined();
    expect(items).toBeNull();
  });

  it("should hide spinner when data has been loaded", () => {
    component.itemsLoading = false;
    fixture.detectChanges();
    const spinner: DebugElement = debug.query(By.css(".spinnerWrapper"));
    const items: DebugElement = debug.query(By.css(".itemsWrapper"));
    expect(spinner).toBeNull();
    expect(items).toBeDefined();
  });

  it("should disable paginator until data arrive", () => {
    component.paginatorChangedHandler({} as PageEvent);
    expect(component.paginatorDisabled).toBeTruthy();
    component.items = itemsData;
    expect(component.paginatorDisabled).toBeFalsy();
  });

  it("should emit paginator change event when page changed", () => {
    spyOn(component.paginatorChanged, "emit");
    component.showPaginator = true;
    fixture.detectChanges();
    const paginator: DebugElement = debug.query(By.css("mat-paginator"));
    paginator.nativeElement.dispatchEvent(new Event("page"));
    expect(component.paginatorChanged.emit).toHaveBeenCalled();
    expect(component.paginatorDisabled).toBeTruthy();
  });

  it("should open dialog when button click event emitted", () => {
    spyOn(dialogService, "open").and.callThrough();
    component.buyButtonHandler(itemsData[0]);
    component.sellButtonHandler(itemsData[0]);
    component.openButtonHandler(itemsData[0]);
    expect(dialogService.open).toHaveBeenCalledTimes(3);
  });

  it("should remove item from list and change user cash when item has been bought", () => {
    spyOn(dialogService, "open").and.returnValue(jasmine.createSpyObj({ afterClosed: of(true) }));
    spyOn(apiService, "buyItem").and.returnValue(of({ status: SUCCESS }));
    spyOn(itemsService, "removeMarketItem");
    spyOn(authenticationService, "addValueToUserCash");
    component.buyButtonHandler(itemsData[0]);
    expect(apiService.buyItem).toHaveBeenCalledWith(itemsData[0]._id);
    expect(itemsService.removeMarketItem).toHaveBeenCalledWith(itemsData[0]._id);
    expect(authenticationService.addValueToUserCash).toHaveBeenCalledWith(-itemsData[0].price);
  });

  it("should remove item from list and change user cash when item has been sold", () => {
    spyOn(dialogService, "open").and.returnValue(jasmine.createSpyObj({ afterClosed: of(true) }));
    spyOn(apiService, "sellItem").and.returnValue(of({ status: SUCCESS }));
    spyOn(itemsService, "removeOwnedItem");
    spyOn(authenticationService, "addValueToUserCash");
    component.sellButtonHandler(itemsData[0]);
    expect(apiService.sellItem).toHaveBeenCalledWith(itemsData[0]._id);
    expect(itemsService.removeOwnedItem).toHaveBeenCalledWith(itemsData[0]._id);
    expect(authenticationService.addValueToUserCash).toHaveBeenCalledWith(itemsData[0].price);
  });
});
