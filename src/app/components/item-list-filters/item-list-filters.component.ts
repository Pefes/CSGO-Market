import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { PRICE_HIGHEST, PRICE_LOWEST, SORT_ASCENDING, SORT_DESCENDING } from "src/app/data/constants-messages.data";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";
import { PropertyToFilter } from "src/app/models/property-to-filter.model";

@Component({
  selector: "item-list-filters",
  templateUrl: "./item-list-filters.component.html",
  styleUrls: ["./item-list-filters.component.scss"]
})
export class ItemListFiltersComponent implements OnInit {

  public sortingOptions: { value: string, label: string }[] = [
    { value: SORT_DESCENDING, label: PRICE_HIGHEST },
    { value: SORT_ASCENDING, label: PRICE_LOWEST },
    { value: "", label: "None" }
  ];
  public selectedSortingOption: string = "";

  public filtersForm: FormGroup = new FormGroup({});

  @Input() public propertiesToFilter: PropertyToFilter[] = [];
  @Output() public filtersApplied: EventEmitter<ItemListFiltersData> = new EventEmitter<ItemListFiltersData>();

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

  public clearAllFilters(): void {
    this.filtersForm.reset();
    Object.keys(this.filtersForm.controls).forEach((key: string) => {
      this.filtersForm.get(key)?.setValue("");
    });
  }

  public applyFilters(): void {
    let sorting = null;
    if (this.filtersForm.value.sortingOption) {
      sorting = { price: this.filtersForm.value.sortingOption };
    }

    const { sortingOption = null, ...filtersData } = {
      ...this.filtersForm.value,
      sorting
    };

    const filtersAsArray: any[] = Object.entries(filtersData).filter(([key, value]) => value);
    const filtersAsObject: ItemListFiltersData = Object.assign({}, ...filtersAsArray.map(([key, value]) => ({ [key]: value })));

    this.filtersApplied.emit(filtersAsObject);
  }

  public getFormControl(property: string): FormControl {
    return this.filtersForm.controls[property] as FormControl;
  }
}
