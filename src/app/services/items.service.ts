import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Item } from "../models/item.model";

@Injectable({
  providedIn: "root"
})
export class ItemsService {

  private _ownedItemRemoved: Subject<string> = new Subject();
  private _ownedItemAdded: Subject<Item> = new Subject();
  private _marketItemRemoved: Subject<string> = new Subject();
  private _marketItemAdded: Subject<Item> = new Subject();

  constructor() { }

  public ownedItemRemoved(): Observable<string> {
    return this._ownedItemRemoved.asObservable();
  }

  public ownedItemAdded(): Observable<Item> {
    return this._ownedItemAdded.asObservable();
  }

  public marketItemRemoved(): Observable<string> {
    return this._marketItemRemoved.asObservable();
  }

  public marketItemAdded(): Observable<Item> {
    return this._marketItemAdded.asObservable();
  }

  public removeOwnedItem(itemId: string): void {
    this._ownedItemRemoved.next(itemId);
  }

  public addOwnedItem(item: Item): void {
    this._ownedItemAdded.next(item);
  }

  public removeMarketItem(itemId: string): void {
    this._marketItemRemoved.next(itemId);
  }

  public addMarketItem(item: Item): void {
    this._marketItemAdded.next(item);
  }
}
