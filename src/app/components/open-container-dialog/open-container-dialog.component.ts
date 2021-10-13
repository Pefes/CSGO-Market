import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { OPEN_CONTAINER_DIALOG_PANEL_CLASS, SUCCESS } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { ItemsService } from "src/app/services/items.service";
import { ShowDrawnItemDialogComponent } from "../show-drawn-item-dialog/show-drawn-item-dialog.component";

@Component({
  selector: "open-container-dialog",
  templateUrl: "./open-container-dialog.component.html",
  styleUrls: ["./open-container-dialog.component.scss"]
})
export class OpenContainerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OpenContainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemData: Item, [key: string]: any },
    private _api: ApiService,
    private _dialogService: MatDialog,
    private _itemsService: ItemsService) {}

  public openButtonClickHandler(): void {
    if (this.data.isTryOut) {
      this._openTryOutContainer();
    } else {
      this._openContainer();
    }
  }

  private _openTryOutContainer(): void {
    this._api.openTryOutContainer(this.data.itemData._id).subscribe(response => {
      if (response.status === SUCCESS) {
        this._dialogService.open(ShowDrawnItemDialogComponent, {
          panelClass: OPEN_CONTAINER_DIALOG_PANEL_CLASS,
          data: { 
            itemData: response.data.drawnItem,
            showSellButton: false
          }
        });
      }

      this.dialogRef.close();
    });
  }

  private _openContainer(): void {
    this._api.openContainer(this.data.itemData._id).subscribe(response => {
      if (response.status === SUCCESS) {
        this._dialogService.open(ShowDrawnItemDialogComponent, {
          panelClass: OPEN_CONTAINER_DIALOG_PANEL_CLASS,
          data: {
            itemData: response.data.drawnItem
          }
        });
        this._itemsService.removeOwnedItem(this.data.itemData._id);
      }

      this.dialogRef.close();
    });
  }

  public closeButtonClickHandler(): void {
    this.dialogRef.close();
  }
}
