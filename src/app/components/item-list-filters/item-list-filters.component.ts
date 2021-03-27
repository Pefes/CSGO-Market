import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PRICE_HIGHEST, PRICE_LOWEST } from "src/app/data/variables.data";

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
  @Input() public items: any[] = [];
  @Output() public onFiltersApplied: EventEmitter<any[]> = new EventEmitter<any[]>();

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
    const filteredItems = this.items.filter(item => {
      for (let [key, value] of Object.entries(this.filtersApplied)) {
        if (!this._validateTextInput(item[key], value))
          return false;
      }
      return true;
    });

    this.onFiltersApplied.emit(filteredItems);
  }

  private _validateTextInput(propertyValue: string, filter: any): boolean {
    if (!filter)
      return true;

    if (!propertyValue)
      return false;
    
    return propertyValue.toLocaleLowerCase().includes((filter as string).toLocaleLowerCase());
  }

}
