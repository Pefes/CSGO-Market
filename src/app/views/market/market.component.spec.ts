import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { AutocompleteFormFieldComponent } from "src/app/components/autocomplete-form-field/autocomplete-form-field.component";
import { ImageContainerComponent } from "src/app/components/image-container/image-container.component";
import { ItemListFiltersComponent } from "src/app/components/item-list-filters/item-list-filters.component";
import { ItemListComponent } from "src/app/components/item-list/item-list.component";
import { ItemComponent } from "src/app/components/item/item.component";
import { TextColorDirective } from "src/app/directives/text-color.directive";
import { ItemListPaginatorData } from "src/app/models/item-list-paginator-data.model";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { ItemsService } from "src/app/services/items.service";
import { EquipmentComponent } from "../equipment/equipment.component";
import { MarketComponent } from "./market.component";

describe("MarketComponent", () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;
  let debug: DebugElement;
  let apiService: ApiService;
  let itemsService: ItemsService;
  const itemsData: { items: Item[], querySize: number } = {
    querySize: 4,
    items: [
      { id: "id1", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
      { id: "id2", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
      { id: "id3", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
      { id: "id4", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null }
    ]
  };
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
      declarations: [
        EquipmentComponent,
        ItemComponent,
        ItemListComponent,
        ItemListFiltersComponent,
        AutocompleteFormFieldComponent,
        ImageContainerComponent,
        TextColorDirective
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule,
        RouterTestingModule,
        MatPaginatorModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ApiService },
        { provide: ItemsService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    apiService = TestBed.inject(ApiService);
    itemsService = TestBed.inject(ItemsService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get data from api on init", () => {
    spyOn(apiService, "getMarketItems").and.returnValue(of(itemsData));
    expect(component.itemsLoading).toBeTruthy();
    fixture.detectChanges();
    expect(apiService.getMarketItems).toHaveBeenCalled();
    expect(component.itemsLoading).toBeFalsy();
    expect(component.marketItems).toEqual(itemsData.items);
    expect(component.querySize).toEqual(itemsData.querySize);
  });

  it("should add item when market changes", () => {
    spyOn(itemsService, "marketItemAdded").and.returnValue(of(itemData));
    fixture.detectChanges();
    expect(component.marketItems).toContain(itemData);
  });

  it("should remove item when market changes", () => {
    spyOn(itemsService, "marketItemRemoved").and.returnValue(of("id1"));
    component.marketItems = itemsData.items;
    fixture.detectChanges();
    expect(component.marketItems).not.toContain(itemsData.items[0]);
  });

  it("should get data based on filters applied event data", () => {
    const testData: { test: string } = { test: "test" };
    fixture.detectChanges();
    spyOn(apiService, "getMarketItems").and.returnValue(of(itemsData));

    const itemsListFilters: ItemListFiltersComponent = debug.query(By.css("item-list-filters")).componentInstance;
    itemsListFilters.filtersApplied.emit(testData);
    expect(apiService.getMarketItems).toHaveBeenCalledWith({ filtersData: testData, paginatorData: {} as ItemListPaginatorData });
  });

  it("should get data based on paginator changed event data", () => {
    const testData: ItemListPaginatorData = { pageNumber: 0, pageSize: 0 };
    fixture.detectChanges();
    spyOn(apiService, "getMarketItems").and.returnValue(of(itemsData));

    const itemsListFilters: ItemListComponent = debug.query(By.css("item-list")).componentInstance;
    itemsListFilters.paginatorChanged.emit(testData);
    expect(apiService.getMarketItems).toHaveBeenCalledWith({ filtersData: {}, paginatorData: testData });
  });
});
