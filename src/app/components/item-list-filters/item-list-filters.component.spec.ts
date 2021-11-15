import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { ItemListFiltersData } from "src/app/models/item-list-filters-data.model";
import { PropertyToFilter } from "src/app/models/property-to-filter.model";
import { AutocompleteFormFieldComponent } from "../autocomplete-form-field/autocomplete-form-field.component";
import { ItemListFiltersComponent } from "./item-list-filters.component";


describe("ItemListFiltersComponent", () => {
  let component: ItemListFiltersComponent;
  let fixture: ComponentFixture<ItemListFiltersComponent>;
  let debug: DebugElement;
  let allPropertiesToFilter: string[];
  const propertiesToFilter: PropertyToFilter[] = [
    { property: "name" },
    { property: "exterior" },
    { property: "rarity" },
    { property: "type" },
    { property: "openable",
        select: true,
        options: [
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
            { value: "", label: "None" }
        ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListFiltersComponent, AutocompleteFormFieldComponent],
      imports: [
        MatExpansionModule,
        BrowserAnimationsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatInputModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListFiltersComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;

    allPropertiesToFilter = ["sortingOption", ...propertiesToFilter.map(property => property.property)];
    component.propertiesToFilter = propertiesToFilter;
    fixture.detectChanges();

    allPropertiesToFilter.forEach((property: string) => {
      component.filtersForm.controls[property].setValue("customValue");
    });
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form group", () => {
    const createdFormControlKeys: string[] = Object.keys(component.filtersForm.controls);
    expect(allPropertiesToFilter).toEqual(createdFormControlKeys);
  });

  it("should clear form controls when user click clear button", () => {
    spyOn(component, "clearAllFilters").and.callThrough();

    const clearButton: DebugElement = debug.query(By.css(".clearButton"));
    clearButton.nativeElement.dispatchEvent(new Event("click"));

    expect(component.clearAllFilters).toHaveBeenCalled();
    allPropertiesToFilter.forEach((property: string) => {
      expect(component.filtersForm.value[property]).toBeFalsy();
    });
  });

  it("should emit event with proper filter/sort data when user click apply button", () => {
    spyOn(component, "applyFilters").and.callThrough();
    spyOn(component.filtersApplied, "emit");

    const properEventData: ItemListFiltersData = { sorting: { price: "customValue" } };
    allPropertiesToFilter.forEach((property: string) => {
      properEventData[property] = "customValue";
    });
    delete properEventData.sortingOption;

    const applyButton: DebugElement = debug.query(By.css(".applyButton"));
    applyButton.nativeElement.dispatchEvent(new Event("click"));

    expect(component.applyFilters).toHaveBeenCalled();
    expect(component.filtersApplied.emit).toHaveBeenCalledWith(properEventData);
  });
});
