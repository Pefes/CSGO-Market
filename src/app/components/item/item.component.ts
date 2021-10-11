import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CSGO_API_IMAGE_URL } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";

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
    this.imageUrl = this._data.iconUrl ? `${ this._api.getApiUrl("api/getItemImage?imageUrl=") }${ this._data.iconUrl }` : "";
  }

  @Input() public showBuyButton: boolean = false;
  @Input() public showSellButton: boolean = false;
  @Input() public showOpenButton: boolean = false;
  @Output() public buyButtonClicked: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() public sellButtonClicked: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() public openButtonClicked: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(private _api: ApiService) { }

  public checkIfEmpty(value: string): string {
    return value ?? "-";
  }

  public buyButtonClickedHandler(): void {
    this.buyButtonClicked.emit(this.data);
  }
  
  public sellButtonClickedHandler(): void {
    this.sellButtonClicked.emit(this.data);
  }

  public openButtonClickedHandler(): void {
    this.openButtonClicked.emit(this.data);
  }
}
