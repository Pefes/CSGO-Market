import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CSGO_API_IMAGE_URL } from "src/app/data/variables.data";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";

@Component({
  selector: "item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent {

  public imageUrl: string = "";

  private _data: any;
  public get data(): any { return this._data; }
  @Input() public set data(data: any) {
    this._data = data;
    this.imageUrl = `${ CSGO_API_IMAGE_URL }${ this._data.icon_url}`;
  }

  @Input() showBuyButton: boolean = false;
  @Input() showSellButton: boolean = false;
  @Input() showOpenButton: boolean = false;

  constructor(private _dialogService: MatDialog) { }

  public openYesNoDialog(contentText: string): MatDialogRef<YesNoDialogComponent> {
    return this._dialogService.open(YesNoDialogComponent, {
      data: {
        contentText: contentText
      }
    });
  }

  public buyButtonHandler(): void {
    this.openYesNoDialog("Are you sure you want to buy this item?")
    .afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  
  public sellButtonHandler(): void {
    this.openYesNoDialog("Are you sure you want to sell this item?")
    .afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public openButtonHandler(): void {
    this.openYesNoDialog("Are you sure you want to open this case?")
    .afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
