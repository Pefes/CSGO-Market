import { CurrencyPipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { DEFAULT_LANGUAGE } from "src/app/data/constants-messages.data";
import { TextColorDirective } from "src/app/directives/text-color.directive";
import { Item } from "src/app/models/item.model";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ImageContainerComponent } from "../image-container/image-container.component";
import { ItemComponent } from "./item.component";

describe("ItemComponent", () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let debug: DebugElement;
  const currencyPipe: CurrencyPipe = new CurrencyPipe(DEFAULT_LANGUAGE);
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
      declarations: [ItemComponent, ImageContainerComponent, TextColorDirective],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatCardModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot()
      ],
      providers: [{ provide: AuthenticationService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set item data in html", () => {
    component.data = itemData;
    fixture.detectChanges();
    const itemType: DebugElement = debug.query(By.css(".itemType"));
    const itemExterior: DebugElement = debug.query(By.css(".itemExterior"));
    const itemRarity: DebugElement = debug.query(By.css(".itemRarity"));
    const itemPrice: DebugElement = debug.query(By.css(".price"));
    expect(itemType.nativeElement.textContent.toLowerCase()).toEqual(itemData.type);
    expect(itemExterior.nativeElement.textContent.toLowerCase()).toEqual(itemData.exterior);
    expect(itemRarity.nativeElement.textContent.toLowerCase()).toEqual(itemData.rarity);
    expect(itemPrice.nativeElement.textContent).toEqual(currencyPipe.transform(itemData.price));
  });

  it("should replace empty values with default one", () => {
    spyOn(component, "checkIfEmpty").and.callThrough();
    component.data = { ...itemData, type: "" };
    fixture.detectChanges();
    const itemType: DebugElement = debug.query(By.css(".itemType"));
    expect(itemType.nativeElement.textContent.toLowerCase()).toEqual("-");
    expect(component.checkIfEmpty).toHaveBeenCalled();
  });

  it("should hide buttons initially when not needed", () => {
    fixture.detectChanges();
    const buttons: DebugElement[] = debug.queryAll(By.css("button"));
    expect(buttons.length).toEqual(0);
  });

  it("should show buttons when needed", () => {
    const authenticationService: AuthenticationService = TestBed.inject(AuthenticationService);
    spyOn(authenticationService, "isLoggedIn").and.returnValue(true);
    component.data = itemData;
    component.showBuyButton = true;
    component.showSellButton = true;
    component.showOpenButton = true;
    fixture.detectChanges();
    const buttons: DebugElement[] = debug.queryAll(By.css("button"));
    expect(buttons.length).toEqual(3);
  });

  it("should hide sell/buy button when user not logged in", () => {
    const authenticationService: AuthenticationService = TestBed.inject(AuthenticationService);
    spyOn(authenticationService, "isLoggedIn").and.returnValue(false);
    component.showBuyButton = true;
    component.showSellButton = true;
    fixture.detectChanges();
    const sellButton: DebugElement = debug.query(By.css("sellButton"));
    const buyButton: DebugElement = debug.query(By.css("buyButton"));
    expect(sellButton).toBeNull();
    expect(buyButton).toBeNull();
  });

  it("should hide open button when not openable", () => {
    component.data = { ...itemData, openable: false };
    component.showOpenButton = true;
    fixture.detectChanges();
    const openButton: DebugElement = debug.query(By.css("openButton"));
    expect(openButton).toBeNull();
  });

  it("should emit event when user click button", () => {
    const authenticationService: AuthenticationService = TestBed.inject(AuthenticationService);
    spyOn(authenticationService, "isLoggedIn").and.returnValue(true);
    component.showBuyButton = true;
    component.showSellButton = true;
    component.showOpenButton = true;
    component.data = itemData;
    spyOn(component.sellButtonClicked, "emit");
    spyOn(component.buyButtonClicked, "emit");
    spyOn(component.openButtonClicked, "emit");
    fixture.detectChanges();

    const buttons: DebugElement[] = debug.queryAll(By.css("button"));
    buttons.forEach((button: DebugElement) => {
      button.nativeElement.dispatchEvent(new Event("click"));
    });

    expect(component.sellButtonClicked.emit).toHaveBeenCalledWith(itemData);
    expect(component.buyButtonClicked.emit).toHaveBeenCalledWith(itemData);
    expect(component.openButtonClicked.emit).toHaveBeenCalledWith(itemData);
  });
});
