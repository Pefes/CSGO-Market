import { Component, OnInit } from "@angular/core";
import { propertiesToFilter } from "src/app/config/properties-to-filter.config";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";
import { ItemListPaginatorData } from "src/app/models/item-list-paginator-data.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"]
})
export class MarketComponent implements OnInit {
  public marketItems: any[] = [];
  public propertiesToFilter: any[] = propertiesToFilter;
  public querySize: number = 0;
  private _itemListPaginatorData: ItemListPaginatorData = {} as ItemListPaginatorData;
  private _itemListFiltersData: ItemListFiltersData = {} as ItemListFiltersData;

  constructor(private _api: ApiService) { }

  public ngOnInit(): void {
    this._getMarketItems();
  }

  private _getMarketItems(): void {
    this._api.getMarketItems({ filtersData: this._itemListFiltersData, paginatorData: this._itemListPaginatorData }).subscribe(data => {
      console.log(data);
      this.marketItems = data.items;
      this.querySize = data.querySize;
    });
  }

  public filtersAppliedHandler(filtersData: ItemListFiltersData): void {
    this._itemListFiltersData = filtersData;
    this._getMarketItems();
  }

  public paginatorChangedHandler(paginatorData: ItemListPaginatorData): void {
    this._itemListPaginatorData = paginatorData;
    this._getMarketItems();
  }

  public itemRemovedHandler(itemId: string): void {
    this.marketItems = this.marketItems.filter(item => item._id !== itemId);
  }
}
