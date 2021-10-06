import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { PRICE_HIGHEST, PRICE_LOWEST, SORT_ASCENDING, SORT_DESCENDING } from "src/app/data/variables-messages.data";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";

@Component({
  selector: 'item-list-filters',
  templateUrl: './item-list-filters.component.html',
  styleUrls: ['./item-list-filters.component.scss']
})
export class ItemListFiltersComponent implements OnInit {

  public sortingOptions: any[] = [PRICE_HIGHEST, PRICE_LOWEST];
  public selectedSortingOption: string = "";

  public filtersForm: FormGroup = new FormGroup({});

  @Input() public propertiesToFilter: any[] = [];
  @Output() public onFiltersApplied: EventEmitter<ItemListFiltersData> = new EventEmitter<ItemListFiltersData>();

  public ngOnInit(): void {
    this._initFiltersAppliedData();
  }

  private _initFiltersAppliedData(): void {
    const newFiltersApplied: { [key: string]: FormControl } = { sortingOption: new FormControl("") };
    this.propertiesToFilter.forEach(filter => {
      newFiltersApplied[filter.property] = new FormControl("");
    });
    
    this.filtersForm = new FormGroup(newFiltersApplied);
  }

  public clearSingleFilter(property: string): void {
    this.filtersForm.controls[property].setValue("");
  }

  public clearAllFilters(): void {
    this.filtersForm.reset();
  }

  public applyFilters(): void {
    let sorting = null;
    if (this.filtersForm.value.sortingOption) {
      sorting = { price: this.filtersForm.value.sortingOption === PRICE_HIGHEST ? SORT_DESCENDING : SORT_ASCENDING };
    }

    const { sortingOption = null, ...filtersData } = {
      ...this.filtersForm.value,
      sorting
    };

    this.onFiltersApplied.emit(filtersData);
  }
}
