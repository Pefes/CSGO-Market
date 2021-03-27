import { Component, Input, OnInit } from "@angular/core";
import { CSGO_API_IMAGE_URL } from "src/app/data/variables.data";

@Component({
  selector: "item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
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
