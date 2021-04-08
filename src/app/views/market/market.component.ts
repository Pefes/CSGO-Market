import { Component, OnInit } from "@angular/core";
import { propertiesToFilter } from "src/app/config/properties-to-filter.config";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"]
})
export class MarketComponent implements OnInit {
  public marketItems: any[] = [];
  public filteredMarketItems: any[] = [];
  public propertiesToFilter: any[] = propertiesToFilter;

  constructor(private _api: ApiService) { }

  public ngOnInit(): void {
    this._getMarketItems();
  }

  private _getMarketItems(): void {
    this._api.getMarketItems().subscribe(data => {
      console.log(data);
      this.marketItems = data;
      this.filteredMarketItems = [ ...this.marketItems ];
    });
  }

  public filtersAppliedHandler(data: any[]): void {
    this.filteredMarketItems = [ ...data ];
  }

  public itemRemovedHandler(itemId: string): void {
    this.marketItems = this.marketItems.filter(item => item._id !== itemId);
    this.filteredMarketItems = this.filteredMarketItems.filter(item => item._id !== itemId);
  }
}
