import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"]
})
export class MarketComponent implements OnInit {
  public marketItems: any[] = [];

  constructor(private api: ApiService) { }

  public ngOnInit(): void {
    this._getMarketItems();
  }

  private _getMarketItems(): void {
    this.api.getMarketItems().subscribe(data => { this.marketItems = data.items_list; });
  }
}
