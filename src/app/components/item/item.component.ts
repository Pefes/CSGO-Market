import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent {

  public imageUrl: string = "";
  public imageLoading: boolean = true;

  private _data: Item = {} as Item;
  public get data(): Item { return this._data; }
  @Input() public set data(data: Item) {
    this._data = data;
    this.imageUrl = this._data.iconUrl ? this._api.getImageApiUrl(this._data.iconUrl) : "";
  }

  @Input() public showBuyButton: boolean = false;
  @Input() public showSellButton: boolean = false;
  @Input() public showOpenButton: boolean = false;
  @Output() public buyButtonClicked: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() public sellButtonClicked: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() public openButtonClicked: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(private _api: ApiService, private _authenticationService: AuthenticationService) { }

  public isLoggedIn(): boolean {
    return this._authenticationService.isLoggedIn();
  }

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

  public imageLoadedHandler(): void {
    this.imageLoading = false;
  }
}
