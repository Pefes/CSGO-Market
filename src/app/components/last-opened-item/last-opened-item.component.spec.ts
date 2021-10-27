import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BackgroundColorDirective } from "src/app/directives/background-color.directive";
import { LastOpenedItem } from "src/app/models/last-opened-item.model";
import { ImageContainerComponent } from "../image-container/image-container.component";

import { LastOpenedItemComponent } from "./last-opened-item.component";

describe("LastOpenedItemComponent", () => {
  let component: LastOpenedItemComponent;
  let fixture: ComponentFixture<LastOpenedItemComponent>;
  const lastOpenedItemData: LastOpenedItem = {
    _id: "customValue",
    containerName: "customValue",
    containerIconUrl: "customValue",
    itemIconUrl: "customValue",
    itemName: "customValue",
    itemType: "customValue",
    itemExterior: "customValue",
    itemRarity: "customValue",
    itemRarityColor: "customValue",
    itemPrice: 10,
    ownerUsername: "customValue",
    openedDate: new Date()
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastOpenedItemComponent, ImageContainerComponent, BackgroundColorDirective],
      imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule, MatIconModule, MatProgressSpinnerModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastOpenedItemComponent);
    component = fixture.componentInstance;
    component.item = lastOpenedItemData;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should hide hoverInfo on init", () => {
    const hoverInfo: DebugElement = fixture.debugElement.query(By.css(".hoverInfo"));
    expect(component.isHovered).toBeFalsy();
    expect(hoverInfo.properties["@hover"]).toEqual("mouseLeft");
  });

  it("should change isHovered and show/hide overlay when mouse enter and leave", () => {
    const hoverInfo: DebugElement = fixture.debugElement.query(By.css(".hoverInfo"));

    fixture.debugElement.nativeElement.dispatchEvent(new Event("mouseenter"));
    fixture.detectChanges();

    expect(component.isHovered).toBeTruthy();
    expect(hoverInfo.properties["@hover"]).toEqual("mouseEntered");

    fixture.debugElement.nativeElement.dispatchEvent(new Event("mouseleave"));
    fixture.detectChanges();

    expect(component.isHovered).toBeFalsy();
    expect(hoverInfo.properties["@hover"]).toEqual("mouseLeft");
  });
});
