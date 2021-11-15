import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { ItemListComponent } from "src/app/components/item-list/item-list.component";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { TryOutComponent } from "./try-out.component";

describe("TryOutComponent", () => {
  let component: TryOutComponent;
  let fixture: ComponentFixture<TryOutComponent>;
  let debug: DebugElement;
  let apiService: ApiService;
  const itemsData: Item[] = [
    { id: "id", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
    { id: "id", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
    { id: "id", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null },
    { id: "id", name: "name", iconUrl: "iconUrl", type: "type", weaponType: "weaponType", gunType: "gunType", exterior: "exterior", rarity: "rarity", rarityColor: "rarityColor", price: 10, purchasable: true, openable: true, content: null }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TryOutComponent, ItemListComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule,
        MatCardModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()],
      providers: [{ provide: ApiService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TryOutComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    apiService = TestBed.inject(ApiService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get items from api", () => {
    spyOn(apiService, "getTryOutItems").and.returnValue(of(itemsData));
    expect(component.itemsLoading).toBeTruthy();
    fixture.detectChanges();
    expect(component.itemsLoading).toBeFalsy();
    expect(component.tryOutItems).toEqual(itemsData);
  });
});
