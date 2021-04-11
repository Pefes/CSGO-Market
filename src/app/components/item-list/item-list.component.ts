import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SUCCESS } from "src/app/data/variables-messages.data";
import { ApiService } from "src/app/services/api.service";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";

@Component({
  selector: "item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"]
})
export class ItemListComponent {

  @Input() public items: any[] = [];
  @Input() public showBuyButton: boolean = false;
  @Input() public showSellButton: boolean = false;
  @Input() public showOpenButton: boolean = false;
  @Output() public itemRemoved: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _dialogService: MatDialog,
    private _api: ApiService) { }

  public openYesNoDialog(contentText: string): MatDialogRef<YesNoDialogComponent> {
    return this._dialogService.open(YesNoDialogComponent, {
      data: {
        contentText: contentText
      }
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

  public openButtonHandler(itemId: string): void {
    this.openYesNoDialog("Are you sure you want to open this case?")
    .afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
