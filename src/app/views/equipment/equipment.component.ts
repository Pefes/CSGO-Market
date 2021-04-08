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

  constructor(private _api: ApiService) { }

  public ngOnInit(): void {
    this._getOwnedItems();
  }

  private _getOwnedItems(): void {
    this._api.getOwnedItems().subscribe(data => {
      console.log(data);
      this.ownedItems = data;
      this.filteredOwnedItems = [ ...this.ownedItems ];
    });
  }

  public filtersAppliedHandler(data: any[]): void {
    this.filteredOwnedItems = [ ...data ];
  }

  public itemRemovedHandler(itemId: string): void {
    this.ownedItems = this.ownedItems.filter(item => item._id !== itemId);
    this.filteredOwnedItems = this.filteredOwnedItems.filter(item => item._id !== itemId);  }
}
