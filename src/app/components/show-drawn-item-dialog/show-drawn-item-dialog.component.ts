import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { OPEN_CONTAINER_DIALOG_PANEL_CLASS, SUCCESS } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ItemsService } from "src/app/services/items.service";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";

@Component({
  selector: "show-drawn-item-dialog",
  templateUrl: "./show-drawn-item-dialog.component.html",
  styleUrls: ["./show-drawn-item-dialog.component.scss"]
})
export class ShowDrawnItemDialogComponent implements OnInit {

  public propertiesToShow: string[] = ["name", "type", "exterior", "rarity", "price"];
  public showSellButton: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ShowDrawnItemDialogComponent>,
    private _dialogService: MatDialog,
    private _itemsService: ItemsService,
    private _api: ApiService,
    private _authenticationService: AuthenticationService,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(MAT_DIALOG_DATA) public data: { itemData: Item, [key: string]: any }) {
      this.showSellButton = this.data.showSellButton ?? this.showSellButton;
    }

  public ngOnInit(): void {
    const matDialogElement: any = this._document.querySelector(`.${ OPEN_CONTAINER_DIALOG_PANEL_CLASS } mat-dialog-container`);
    matDialogElement.style.boxShadow = `0px 0px 200px 0px #${ this.data.itemData.rarityColor }`;
  }
  
  public buttonCloseClickHandler(): void {
    this._itemsService.addOwnedItem(this.data.itemData);
    this.dialogRef.close();
  }

  public buttonSellClickHandler(): void {
    this._dialogService.open(YesNoDialogComponent, {
      data: {
        contentText: "Are you sure you want to sell this item?"
    }}).afterClosed().subscribe(result => {
      if (result) {
        this._api.sellItem(this.data.itemData._id).subscribe(response => {
          if (response.status === SUCCESS) {
            this._itemsService.removeOwnedItem(this.data.itemData._id);
            this._authenticationService.addValueToUserCash(this.data.itemData.price);
          }

          this.dialogRef.close();
        });
      }
    });
  }

  public getIconFullUrl(): string {
    return this._api.getImageApiUrl(this.data.itemData.iconUrl);
  }
}
