import { Component, OnInit } from "@angular/core";
import { SUCCESS } from "src/app/data/variables-messages.data";
import { LastOpenedItem } from "src/app/models/last-opened-item.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "last-opened-items-list",
  templateUrl: "./last-opened-items-list.component.html",
  styleUrls: ["./last-opened-items-list.component.scss"]
})
export class LastOpenedItemsListComponent {

  public lastOpenedItems: LastOpenedItem[] = [];

  constructor(private _api: ApiService) {
    this._api.getLastOpenedItems().subscribe((response: any) => {
      if (response.status === SUCCESS) {
        this.lastOpenedItems = [...response.data];
      }
    });
  }
}
