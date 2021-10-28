import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { SUCCESS } from "src/app/data/constants-messages.data";
import { BackgroundColorDirective } from "src/app/directives/background-color.directive";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { ItemsService } from "src/app/services/items.service";
import { ImageContainerComponent } from "../image-container/image-container.component";
import { OpenContainerDialogComponent } from "./open-container-dialog.component";


describe("OpenContainerDialogComponent", () => {
  let component: OpenContainerDialogComponent;
  let fixture: ComponentFixture<OpenContainerDialogComponent>;
  let debug: DebugElement;
  let apiService: ApiService;
  let dialogService: MatDialog;
  let itemsService: ItemsService;
  const itemData: Item = {
    _id: "id",
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
    content: [
      { name: "name", iconUrl: "iconUrl", rarity: "rarity", rarityColor: "rarityColor" },
      { name: "name", iconUrl: "iconUrl", rarity: "rarity", rarityColor: "rarityColor" },
      { name: "name", iconUrl: "iconUrl", rarity: "rarity", rarityColor: "rarityColor" }
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenContainerDialogComponent, ImageContainerComponent, BackgroundColorDirective],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { itemData: itemData } },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: ApiService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenContainerDialogComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    apiService = TestBed.inject(ApiService);
    dialogService = TestBed.inject(MatDialog);
    itemsService = TestBed.inject(ItemsService);
    spyOn(apiService, "openContainer").and.returnValue(of({ status: SUCCESS, data: { drawnItem: {} } }));
    spyOn(apiService, "openTryOutContainer").and.returnValue(of({ status: SUCCESS, data: { drawnItem: {} } }));
    spyOn(dialogService, "open").and.callThrough();
    spyOn(itemsService, "removeOwnedItem");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set proper data in html", () => {
    const title: DebugElement = debug.query(By.css("h1"));
    const caseConsistsOfText: DebugElement = debug.query(By.css(".caseConsistsOf p"));
    expect(title.nativeElement.textContent).toContain(component.data.itemData.name);
    expect(caseConsistsOfText.nativeElement.textContent).toContain(component.data.itemData.name);
  });

  it("should create all content items elements", () => {
    const contentItems: DebugElement[] = debug.queryAll(By.css(".contentItems article"));
    expect(contentItems).toHaveSize(itemData.content.length);
  });

  it("should set proper data for all content items", () => {
    const contentItemsText: DebugElement[] = debug.queryAll(By.css(".contentItems article p"));
    contentItemsText.forEach((contentItemText: DebugElement, index: number) => {
      expect(contentItemText.nativeElement.textContent).toEqual(itemData.content[index].name);
    });
  });

  it("should close dialog when user click cancel button", () => {
    spyOn(component.dialogRef, "close").and.callThrough();
    const cancelButton: DebugElement = debug.query(By.css(".cancelButton"));
    cancelButton.nativeElement.dispatchEvent(new Event("click"));
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it("should call api on openContainer when container opened in equipment and remove item from there", () => {
    const openButton: DebugElement = debug.query(By.css(".openButton"));
    openButton.nativeElement.dispatchEvent(new Event("click"));
    expect(apiService.openContainer).toHaveBeenCalled();
    expect(dialogService.open).toHaveBeenCalled();
    expect(itemsService.removeOwnedItem).toHaveBeenCalledWith(component.data.itemData._id);
  });

  it("should call api on openTryOutContainer when container opened in try-out view", () => {
    component.data.isTryOut = true;
    const openButton: DebugElement = debug.query(By.css(".openButton"));
    openButton.nativeElement.dispatchEvent(new Event("click"));
    expect(apiService.openTryOutContainer).toHaveBeenCalled();
    expect(dialogService.open).toHaveBeenCalled();
  });
});
