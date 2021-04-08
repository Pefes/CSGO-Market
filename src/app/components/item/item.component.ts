import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CSGO_API_IMAGE_URL, SUCCESS } from "src/app/data/variables-messages.data";
import { ApiService } from "src/app/services/api.service";
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
    this.imageUrl = `${ CSGO_API_IMAGE_URL }${ this._data.iconUrl }`;
  }

  @Input() public showBuyButton: boolean = false;
  @Input() public showSellButton: boolean = false;
  @Input() public showOpenButton: boolean = false;
  @Output() public buyButtonClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() public sellButtonClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() public openButtonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public buyButtonClickedHandler(): void {
    this.buyButtonClicked.emit(this.data._id);
  }
  
  public sellButtonClickedHandler(): void {
    this.sellButtonClicked.emit(this.data._id);
  }

  public openButtonClickedHandler(): void {
    this.openButtonClicked.emit(this.data._id);
  }
}
