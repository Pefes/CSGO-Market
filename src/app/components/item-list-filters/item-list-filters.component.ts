import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PRICE_HIGHEST, PRICE_LOWEST, SORT_ASCENDING, SORT_DESCENDING } from "src/app/data/variables-messages.data";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";

@Component({
  selector: 'item-list-filters',
  templateUrl: './item-list-filters.component.html',
  styleUrls: ['./item-list-filters.component.scss']
})
export class ItemListFiltersComponent {

  public sortingOptions: any[] = [PRICE_HIGHEST, PRICE_LOWEST];
  public selectedSortingOption: string = "";

  public filtersApplied: any = {};

  @Input() public propertiesToFilter: any[] = [];
  @Output() public onFiltersApplied: EventEmitter<ItemListFiltersData> = new EventEmitter<ItemListFiltersData>();

  constructor() {
    this._initFiltersAppliedData();
  }

  private _initFiltersAppliedData(): void {
    const newFilterApplied: any = {};
    this.propertiesToFilter.forEach(filter => {
      newFilterApplied[filter.property] = "";
    })
    this.filtersApplied = { ...newFilterApplied };
  }

  public clearSingleFilter(property: string): void {
    this.filtersApplied[property] = "";
  }

  public clearAllFilters(): void {
    this._initFiltersAppliedData();
  }

  public applyFilters(): void {
    this.onFiltersApplied.emit({
      ...this.filtersApplied,
      sorting: {
        price: this.selectedSortingOption === PRICE_HIGHEST ? SORT_DESCENDING : SORT_ASCENDING
      }
    });
  }
}
