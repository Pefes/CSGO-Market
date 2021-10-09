import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { SUCCESS } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";
import { ItemListPaginatorData } from "src/app/models/item-list-paginator-data.model";
import { ApiService } from "src/app/services/api.service";
import { OpenContainerDialogComponent } from "../open-container-dialog/open-container-dialog.component";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ItemsService } from "src/app/services/items.service";

@Component({
  selector: "item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"]
})
export class ItemListComponent {

  public currentPageSize: number = 25;
  public currentPageIndex: number = 0;

  @Input() public items: Item[] = [];
  @Input() public querySize: number = 0;
  @Input() public showBuyButton: boolean = false;
  @Input() public showSellButton: boolean = false;
  @Input() public showOpenButton: boolean = false;
  @Output() public paginatorChanged: EventEmitter<ItemListPaginatorData> = new EventEmitter<ItemListPaginatorData>();

  constructor(
    private _dialogService: MatDialog,
    private _api: ApiService,
    private _authenticationService: AuthenticationService,
    private _itemsService: ItemsService) { }

  public paginatorChangedHandler(event: PageEvent): void {
    this.currentPageSize = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.paginatorChanged.emit({ pageNumber: event.pageIndex, pageSize: event.pageSize });
  }

  public openYesNoDialog(contentText: string): MatDialogRef<YesNoDialogComponent> {
    return this._dialogService.open(YesNoDialogComponent, {
      data: {
        contentText: contentText
      }
    });
  }

  public openOpenContainerDialog(itemData: Item): MatDialogRef<OpenContainerDialogComponent> {
    return this._dialogService.open(OpenContainerDialogComponent, {
      data: itemData
    });
  }

  public buyButtonHandler(item: Item): void {
    this.openYesNoDialog("Are you sure you want to buy this item?")
    .afterClosed().subscribe(result => {
      if (result) {
        this._api.buyItem(item._id).subscribe(response => {
          if (response.status === SUCCESS) {
            this._itemsService.removeMarketItem(item._id);
            this._authenticationService.addValueToUserCash(-item.price);
          }
        });
      }
    });
  }
  
  public sellButtonHandler(item: Item): void {
    this.openYesNoDialog("Are you sure you want to sell this item?")
    .afterClosed().subscribe(result => {
      if (result) {
        this._api.sellItem(item._id).subscribe(response => {
          if (response.status === SUCCESS) {
            this._itemsService.removeOwnedItem(item._id);
            this._authenticationService.addValueToUserCash(item.price);
          }
        });
      }
    });
  }

  public openButtonHandler(itemData: Item): void {
    this.openOpenContainerDialog(itemData);
  }
}
