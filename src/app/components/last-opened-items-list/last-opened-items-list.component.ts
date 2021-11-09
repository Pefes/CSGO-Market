import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subject } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";
import { GET_LAST_OPENED_ITEMS_INTERVAL, SUCCESS } from "src/app/data/constants-messages.data";
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
    ]),
    trigger("sideMenuToggle", [
      state("opened", style({ width: "200px" })),
      state("closed", style({ width: "0px" })),
      state("toggleButtonOpened", style({ transform: "rotate(180deg)" })),
      state("toggleButtonClosed", style({ transform: "rotate(0deg)" })),
      transition("opened <=> closed", [animate("250ms")]),
      transition("toggleButtonOpened <=> toggleButtonClosed", [animate("250ms")])
    ])
  ]
})
export class LastOpenedItemsListComponent implements OnInit, OnDestroy {

  public lastOpenedItems: LastOpenedItem[] = [];
  public disableAnimations: boolean = true;
  public sideMenuOpened: boolean = true;
  private _unsubscriber: Subject<any> = new Subject();

  constructor(private _api: ApiService) {}

  public ngOnInit(): void {
    interval(GET_LAST_OPENED_ITEMS_INTERVAL).pipe(
      takeUntil(this._unsubscriber),
      mergeMap((callNumber: number) => {
        callNumber === 1 ? this.disableAnimations = false : null;
        return this._api.getLastOpenedItems();
    }))
    .subscribe((response: any) => {
      if (response.status === SUCCESS) {
        response.data.forEach((lastOpenedItem: LastOpenedItem) => {
          if (!this.lastOpenedItems.some((item: LastOpenedItem) => item.id === lastOpenedItem.id)) {
            this.lastOpenedItems.unshift(lastOpenedItem);
          }
        });
      }
    });
  }

  public toggleButtonClickedHandler(): void {
    this.sideMenuOpened = !this.sideMenuOpened;
  }

  public ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }
}
