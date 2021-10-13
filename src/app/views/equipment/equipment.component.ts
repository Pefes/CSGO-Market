import { Component, OnInit } from '@angular/core';
import { propertiesToFilter } from "src/app/config/properties-to-filter.config";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";
import { ItemListPaginatorData } from "src/app/models/item-list-paginator-data.model";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { ItemsService } from "src/app/services/items.service";

@Component({
  selector: 'equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public ownedItems: Item[] = [];
  public propertiesToFilter: any[] = propertiesToFilter;
  public querySize: number = 0;
  public itemsLoading: boolean = true;
  private _itemListPaginatorData: ItemListPaginatorData = {} as ItemListPaginatorData;
  private _itemListFiltersData: ItemListFiltersData = {} as ItemListFiltersData;

  constructor(private _api: ApiService, private _itemsService: ItemsService) {
    this._itemsService.ownedItemAdded().subscribe((item: Item) => {
      this.ownedItems = [item, ...this.ownedItems];
    });

    this._itemsService.ownedItemRemoved().subscribe((itemId: string) => {
      this.ownedItems = this.ownedItems.filter(item => item._id !== itemId);  
    });
  }

  public ngOnInit(): void {
    this._getOwnedItems();
  }

  private _getOwnedItems(): void {
    this._api.getOwnedItems({ filtersData: this._itemListFiltersData, paginatorData: this._itemListPaginatorData }).subscribe(data => {
      this.ownedItems = data.items;
      this.querySize = data.querySize;
      this.itemsLoading = false;
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
}
