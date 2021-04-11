import { Component, OnInit } from '@angular/core';
import { propertiesToFilter } from "src/app/config/properties-to-filter.config";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public ownedItems: any[] = [];
  public propertiesToFilter: any[] = propertiesToFilter;

  constructor(private _api: ApiService) { }

  public ngOnInit(): void {
    this._getOwnedItems();
  }

  private _getOwnedItems(): void {
    this._api.getOwnedItems().subscribe(data => {
      console.log(data);
      this.ownedItems = data;
    });
  }

  public filtersAppliedHandler(params: ItemListFiltersData): void {
    this._api.getOwnedItems(params).subscribe(data => {
      console.log(data);
      this.ownedItems = data;
    });
  }

  public itemRemovedHandler(itemId: string): void {
    this.ownedItems = this.ownedItems.filter(item => item._id !== itemId);
  }
}
