import { Component, Input, OnInit } from "@angular/core";
import { CSGO_API_IMAGE_URL } from "src/app/data/variables.data";

@Component({
  selector: "market-item",
  templateUrl: "./market-item.component.html",
  styleUrls: ["./market-item.component.scss"]
})
export class MarketItemComponent implements OnInit {
  public imageUrl: string = "";

  private _data: any;
  public get data(): any { return this._data }
  @Input() public set data(data: any) {
    this._data = data;
    this.imageUrl = `${ CSGO_API_IMAGE_URL }${ this._data.icon_url}`;
  }

  constructor() { }

  public ngOnInit(): void {
  }
}
