import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { SUCCESS } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";
import { ItemListPaginatorData } from "src/app/models/item-list-paginator-data.model";
import { ApiService } from "src/app/services/api.service";
import { OpenContainerDialogComponent } from "../open-container-dialog/open-container-dialog.component";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ItemsService } from "src/app/services/items.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
  animations: [
    trigger("itemAddRemove", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ItemListComponent {

  public currentPageSize: number = 25;
  public currentPageIndex: number = 0;
  public paginatorDisabled: boolean = false;
  public hidePageSize: boolean = false;

  private _items: Item[] = [];
  public get items(): Item[] { return this._items };
  public set items(newItems: Item[]) {
    this._items = [...newItems];
    this.paginatorDisabled = false;
  }
  @Input() public items: Item[] = [];
  @Input() public querySize: number = 0;
  @Input() public showBuyButton: boolean = false;
  @Input() public showSellButton: boolean = false;
  @Input() public showOpenButton: boolean = false;
  @Output() public paginatorChanged: EventEmitter<ItemListPaginatorData> = new EventEmitter<ItemListPaginatorData>();

  constructor(
    private _dialogService: MatDialog,
    private _api: ApiService,
    private _authenticationService: AuthenticationService,
    private _itemsService: ItemsService,
    private _breakpointObserver: BreakpointObserver) {

    this._breakpointObserver.observe("(max-width: 480px)").subscribe((result: BreakpointState) => {
        this.hidePageSize = result.matches;
    });
  }

  public paginatorChangedHandler(event: PageEvent): void {
    this.currentPageSize = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.paginatorChanged.emit({ pageNumber: event.pageIndex, pageSize: event.pageSize });
    this.paginatorDisabled = true;
  }

  public openYesNoDialog(contentText: string): MatDialogRef<YesNoDialogComponent> {
    return this._dialogService.open(YesNoDialogComponent, {
      data: {
        contentText: contentText
      }
    });
  }

  public openOpenContainerDialog(itemData: Item): MatDialogRef<OpenContainerDialogComponent> {
    return this._dialogService.open(OpenContainerDialogComponent, {
      data: itemData
    });
  }

  public buyButtonHandler(item: Item): void {
    this.openYesNoDialog("Are you sure you want to buy this item?")
    .afterClosed().subscribe(result => {
      if (result) {
        this._api.buyItem(item._id).subscribe(response => {
          if (response.status === SUCCESS) {
            this._itemsService.removeMarketItem(item._id);
            this._authenticationService.addValueToUserCash(-item.price);
          }
        });
      }
    });
  }
  
  public sellButtonHandler(item: Item): void {
    this.openYesNoDialog("Are you sure you want to sell this item?")
    .afterClosed().subscribe(result => {
      if (result) {
        this._api.sellItem(item._id).subscribe(response => {
          if (response.status === SUCCESS) {
            this._itemsService.removeOwnedItem(item._id);
            this._authenticationService.addValueToUserCash(item.price);
          }
        });
      }
    });
  }

  public openButtonHandler(itemData: Item): void {
    this.openOpenContainerDialog(itemData);
  }
}
