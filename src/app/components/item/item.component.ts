import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CSGO_API_IMAGE_URL } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";

@Component({
  selector: "item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent {

  public imageUrl: string = "";

  private _data: Item = {} as Item;
  public get data(): Item { return this._data; }
  @Input() public set data(data: Item) {
    this._data = data;
    this.imageUrl = this._data.iconUrl ? `${ CSGO_API_IMAGE_URL }${ this._data.iconUrl }` : "";
  }

  @Input() public showBuyButton: boolean = false;
  @Input() public showSellButton: boolean = false;
  @Input() public showOpenButton: boolean = false;
  @Output() public buyButtonClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() public sellButtonClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() public openButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public checkIfEmpty(value: string): string {
    return value ?? "-";
  }

  public buyButtonClickedHandler(): void {
    this.buyButtonClicked.emit(this.data._id);
  }
  
  public sellButtonClickedHandler(): void {
    this.sellButtonClicked.emit(this.data._id);
  }

  public openButtonClickedHandler(): void {
    this.openButtonClicked.emit(this.data);
  }
}
