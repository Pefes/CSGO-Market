import { TitleCasePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { SUCCESS } from "src/app/data/constants-messages.data";
import { TextColorDirective } from "src/app/directives/text-color.directive";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ItemsService } from "src/app/services/items.service";
import { ImageContainerComponent } from "../image-container/image-container.component";
import { SnakeBorderCardComponent } from "../snake-border-card/snake-border-card.component";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";
import { ShowDrawnItemDialogComponent } from "./show-drawn-item-dialog.component";


describe("ShowDrawnItemDialogComponent", () => {
  let component: ShowDrawnItemDialogComponent;
  let fixture: ComponentFixture<ShowDrawnItemDialogComponent>;
  let debug: DebugElement;
  let dialogService: MatDialog;
  let itemsService: ItemsService;
  let authenticationService: AuthenticationService;
  let apiService: ApiService;
  const itemData: Item = {
    id: "id",
    name: "name",
    iconUrl: "iconUrl",
    type: "type",
    weaponType: "weaponType",
    gunType: "gunType",
    exterior: "exterior",
    rarity: "rarity",
    rarityColor: "rarityColor",
    price: 10,
    purchasable: true,
    openable: true,
    content: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDrawnItemDialogComponent, ImageContainerComponent, SnakeBorderCardComponent, TextColorDirective],
      imports: [
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule,
        MatDividerModule,
        MatCardModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { itemData: itemData } },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDrawnItemDialogComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    dialogService = TestBed.inject(MatDialog);
    itemsService = TestBed.inject(ItemsService);
    authenticationService = TestBed.inject(AuthenticationService);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show all properties to show", () => {
    const propertiesToShow: DebugElement[] = debug.queryAll(By.css(".propertyWrapper"));
    expect(propertiesToShow).toHaveSize(component.propertiesToShow.length);
  });

  it("should set proper data for all properties to show", () => {
    const titleCasePipe: TitleCasePipe = new TitleCasePipe();
    const propertyValues: DebugElement[] = debug.queryAll(By.css(".propertyValue"));
    let expectedValue: string;

    propertyValues.forEach((propertyValue: DebugElement, index: number) => {
      expectedValue = titleCasePipe.transform(component.data.itemData[component.propertiesToShow[index]]);
      expect(propertyValue.nativeElement.textContent.trim()).toEqual(expectedValue);
    });
  });

  it("should show/hide sell button when needed", () => {
    let sellButton: DebugElement = debug.query(By.css(".sellButton"));
    expect(sellButton).toBeDefined();

    component.showSellButton = false;
    fixture.detectChanges();
    sellButton = debug.query(By.css(".sellButton"));
    expect(sellButton).toBeNull();
  });

  it("should open yes-no-dialog when user click sell button", () => {
    spyOn(dialogService, "open");
    const sellButton: DebugElement = debug.query(By.css(".sellButton"));
    sellButton.nativeElement.dispatchEvent(new Event("click"));
    expect(dialogService.open).toHaveBeenCalledWith(YesNoDialogComponent, { data: { contentText: "ITEM_LIST.SELL_ARE_YOU_SURE" } });
  });

  it("should sell item when user click yes on dialog and then remove item from owned items and add value to user cash", () => {
    spyOn(dialogService, "open").and.returnValue(jasmine.createSpyObj({ afterClosed: of(true) }));
    spyOn(apiService, "sellItem").and.returnValue(of({ status: SUCCESS }));
    spyOn(itemsService, "removeOwnedItem").and.callThrough();
    spyOn(authenticationService, "addValueToUserCash");
    spyOn(component.dialogRef, "close");
    component.buttonSellClickHandler();
    expect(apiService.sellItem).toHaveBeenCalledWith(component.data.itemData.id);
    expect(itemsService.removeOwnedItem).toHaveBeenCalledWith(component.data.itemData.id);
    expect(authenticationService.addValueToUserCash).toHaveBeenCalledWith(component.data.itemData.price);
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it("should close dialog when user click close button and add item to owned items when sell button is showed", () => {
    spyOn(component.dialogRef, "close");
    spyOn(itemsService, "addOwnedItem").and.callThrough();
    const closeButton: DebugElement = debug.query(By.css(".closeButton"));
    closeButton.nativeElement.dispatchEvent(new Event("click"));
    expect(itemsService.addOwnedItem).toHaveBeenCalledWith(component.data.itemData);
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it("should close dialog when user click close button and not add item to owned items when sell button is hidden", () => {
    spyOn(component.dialogRef, "close");
    spyOn(itemsService, "addOwnedItem").and.callThrough();
    component.showSellButton = false;
    const closeButton: DebugElement = debug.query(By.css(".closeButton"));
    closeButton.nativeElement.dispatchEvent(new Event("click"));
    expect(itemsService.addOwnedItem).not.toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
