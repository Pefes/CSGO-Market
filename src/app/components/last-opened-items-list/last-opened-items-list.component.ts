import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { SUCCESS } from "src/app/data/variables-messages.data";
import { LastOpenedItem } from "src/app/models/last-opened-item.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "last-opened-items-list",
  templateUrl: "./last-opened-items-list.component.html",
  styleUrls: ["./last-opened-items-list.component.scss"],
  animations: [
    trigger("itemEnterLeave", [
      transition(":enter", [
        style({ height: "0%" }),
        animate("2500ms", style({ height: "100%" }))
      ]),
      transition(":leave", [
        style({ height: "100%" }),
        animate("2500ms", style({ height: "0%" }))
      ])
    ])
  ]
})
export class LastOpenedItemsListComponent {

  public lastOpenedItems: LastOpenedItem[] = [];
  public disableAnimations: boolean = true;

  constructor(private _api: ApiService) {
    interval(3000).pipe(mergeMap((callNumber: number) => {
      callNumber === 1 ? this.disableAnimations = false : null;
      return this._api.getLastOpenedItems();
    }))
    .subscribe((response: any) => {
      if (response.status === SUCCESS) {
        this.lastOpenedItems = [...response.data];
      }
    });
  }

  public addElement(): void {
    this.lastOpenedItems.unshift({...this.lastOpenedItems[19]})
  }
}
