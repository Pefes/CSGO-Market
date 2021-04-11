import { Component, OnInit } from "@angular/core";
import { propertiesToFilter } from "src/app/config/properties-to-filter.config";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"]
})
export class MarketComponent implements OnInit {
  public marketItems: any[] = [];
  public propertiesToFilter: any[] = propertiesToFilter;

  constructor(private _api: ApiService) { }

  public ngOnInit(): void {
    this._getMarketItems();
  }

  private _getMarketItems(): void {
    this._api.getMarketItems().subscribe(data => {
      console.log(data);
      this.marketItems = data;
    });
  }

  public filtersAppliedHandler(params: ItemListFiltersData): void {
    this._api.getMarketItems(params).subscribe(data => {
      console.log(data);
      this.marketItems = data;
    });
  }

  public itemRemovedHandler(itemId: string): void {
    this.marketItems = this.marketItems.filter(item => item._id !== itemId);
  }
}
