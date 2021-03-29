import { Component, OnInit } from '@angular/core';
import { propertiesToFilter } from "src/app/config/properties-to-filter.config";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public ownedItems: any[] = [];
  public filteredOwnedItems: any[] = [];
  public propertiesToFilter: any[] = propertiesToFilter;

  constructor(private api: ApiService) { }

  public ngOnInit(): void {
    this._getOwnedItems();
  }

  private _getOwnedItems(): void {
    this.api.getOwnedItems().subscribe(data => {
      this.ownedItems = data;
      this.filteredOwnedItems = [ ...this.ownedItems ];
    });
  }

  public filtersAppliedHandler(data: any[]): void {
    this.filteredOwnedItems = [ ...data ];
  }

}
