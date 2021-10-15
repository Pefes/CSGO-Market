import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SUCCESS } from "src/app/data/variables-messages.data";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "autocomplete-form-field",
  templateUrl: "./autocomplete-form-field.component.html",
  styleUrls: ["./autocomplete-form-field.component.scss"]
})
export class AutocompleteFormFieldComponent {

  public acOptions: string[] = [];
  public filteredAcOptions: string[] = [];

  private _acProperty: string = "";
  public get acProperty(): string { return this._acProperty };
  @Input() public set acProperty(newAcProperty: string) {
    this._acProperty = newAcProperty;
    this._getAcOptions();
  }

  private _formFieldControl: FormControl = new FormControl("");
  public get formFieldControl(): FormControl { return this._formFieldControl };
  @Input() public set formFieldControl(newFormFieldControl: FormControl) {
    this._formFieldControl = newFormFieldControl;
    this._listenForFormControlChanges();
  }

  @Input() public acListSize: number = 20;
  @Input() public label: string = "";
  @Input() public placeholder: string = "";

  constructor(private _api: ApiService) {  }

  public clearFormFieldHandler(): void {
    this.formFieldControl.setValue("");
  }

  private _getAcOptions(): void {
    if (this._acProperty) {
      this._api.getAutocompleteOptions(this._acProperty).subscribe(response => {
        if (response.status === SUCCESS) {
          this.acOptions = [...response.data];
          this.filteredAcOptions = [...response.data].slice(0, this.acListSize);
        }
      });
    }
  }

  private _listenForFormControlChanges(): void {
    this._formFieldControl.valueChanges.subscribe((newValue: string) => {
      if (newValue) {
        this.filteredAcOptions = this.acOptions.filter((option: string) => {
          return option.toLowerCase().includes(newValue.toLowerCase());
        }).slice(0, this.acListSize);
      } else {
        this.filteredAcOptions = [...this.acOptions].slice(0, this.acListSize);
      }
    });
  }
}
