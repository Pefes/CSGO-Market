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

  constructor(private api: ApiService) { }

  public ngOnInit(): void {
    this._getMarketItems();
  }

  private _getMarketItems(): void {
    this.api.getMarketItems().subscribe(data => {
      this.marketItems = data.items_list;
      this.filteredMarketItems = [ ...this.marketItems ];
    });
  }

  public filtersAppliedHandler(data: any[]): void {
    this.filteredMarketItems = [ ...data ];
  }
}
