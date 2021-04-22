import { Component, OnInit } from '@angular/core';
import { propertiesToFilter } from "src/app/config/properties-to-filter.config";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";
import { ItemListPaginatorData } from "src/app/models/item-list-paginator-data.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public ownedItems: any[] = [];
  public propertiesToFilter: any[] = propertiesToFilter;
  public querySize: number = 0;
  private _itemListPaginatorData: ItemListPaginatorData = {} as ItemListPaginatorData;
  private _itemListFiltersData: ItemListFiltersData = {} as ItemListFiltersData;

  constructor(private _api: ApiService) { }

  public ngOnInit(): void {
    this._getOwnedItems();
  }

  private _getOwnedItems(): void {
    this._api.getOwnedItems({ filtersData: this._itemListFiltersData, paginatorData: this._itemListPaginatorData }).subscribe(data => {
      console.log(data);
      this.ownedItems = data.items;
      this.querySize = data.querySize
    });
  }

  public filtersAppliedHandler(filtersData: ItemListFiltersData): void {
    this._itemListFiltersData = filtersData;
    this._getOwnedItems();
  }

  public paginatorChangedHandler(paginatorData: ItemListPaginatorData): void {
    this._itemListPaginatorData = paginatorData;
    this._getOwnedItems();
  }

  public itemRemovedHandler(itemId: string): void {
    this.ownedItems = this.ownedItems.filter(item => item._id !== itemId);
  }
}
