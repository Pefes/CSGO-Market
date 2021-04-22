import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { SUCCESS } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";
import { ItemListPaginatorData } from "src/app/models/item-list-paginator-data.model";
import { ApiService } from "src/app/services/api.service";
import { OpenContainerDialogComponent } from "../open-container-dialog/open-container-dialog.component";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";

@Component({
  selector: "item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"]
})
export class ItemListComponent {

  @Input() public items: Item[] = [];
  @Input() public querySize: number = 0;
  @Input() public showBuyButton: boolean = false;
  @Input() public showSellButton: boolean = false;
  @Input() public showOpenButton: boolean = false;
  @Output() public itemRemoved: EventEmitter<string> = new EventEmitter<string>();
  @Output() public paginatorChanged: EventEmitter<ItemListPaginatorData> = new EventEmitter<ItemListPaginatorData>();

  constructor(
    private _dialogService: MatDialog,
    private _api: ApiService) { }

  public paginatorChangedHandler(event: PageEvent): void {
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

  public buyButtonHandler(itemId: string): void {
    this.openYesNoDialog("Are you sure you want to buy this item?")
    .afterClosed().subscribe(result => {
      if (result) {
        this._api.buyItem(itemId).subscribe(response => {
          if (response.status === SUCCESS) {
            this.itemRemoved.emit(itemId);
          }
        });
      }
    });
  }
  
  public sellButtonHandler(itemId: string): void {
    this.openYesNoDialog("Are you sure you want to sell this item?")
    .afterClosed().subscribe(result => {
      if (result) {
        this._api.sellItem(itemId).subscribe(response => {
          if (response.status === SUCCESS) {
            this.itemRemoved.emit(itemId);
          }
        });
      }
    });
  }

  public openButtonHandler(itemData: Item): void {
    this.openOpenContainerDialog(itemData).afterClosed().subscribe(result => {
      if (result) {
        this.itemRemoved.emit(itemData._id);
      }
    });
  }
}
