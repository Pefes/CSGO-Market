import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { YesNoDialogComponent } from "../components/yes-no-dialog/yes-no-dialog.component";
import { API_URL as URL, FAIL } from "../data/constants-messages.data";
import { ItemListFiltersData } from "../models/item-list-filters-data.model";
import { ItemListPaginatorData } from "../models/item-list-paginator-data.model";
import { UserSettings } from "../models/user-data.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(private _http: HttpClient, private _dialogService: MatDialog) { }

  public getImageApiUrl(imageId: string): string {
    return `${ URL.GET_ITEM_IMAGE }${ imageId }`;
  }

  public post(url: string, params: any): Observable<any> {
    return this._http.post(url, params).pipe(tap((response: any) => {
      if (response.status === FAIL) {
        this._dialogService.open(YesNoDialogComponent, {
          data: {
            title: "Something went wrong...",
            contentText: response.message,
            showYesButton: false,
            showNoButton: false
          }
        });
      }
    }));
  }

  public getTryOutItems(): Observable<any> {
    return this._http.get(URL.GET_TRY_OUT_ITEMS).pipe(map((data: any) => data.data.openableItems));
  }

  public getMarketItems(params: { filtersData: ItemListFiltersData, paginatorData: ItemListPaginatorData }): Observable<any> {
    return this.post(URL.GET_MARKET_ITEMS, params).pipe(map((data: any) => data.data));
  }

  public getOwnedItems(params: { filtersData: ItemListFiltersData, paginatorData: ItemListPaginatorData }): Observable<any> {
    return this.post(URL.GET_OWNED_ITEMS, params).pipe(map((data: any) => data.data));
  }

  public buyItem(itemId: string): Observable<any> {
    return this.post(URL.BUY_ITEM, { itemId });
  }

  public sellItem(itemId: string): Observable<any> {
    return this.post(URL.SELL_ITEM, { itemId });
  }

  public openContainer(containerId: string): Observable<any> {
    return this.post(URL.OPEN_CONTAINER, { containerId });
  }

  public openTryOutContainer(containerId: string): Observable<any> {
    return this.post(URL.OPEN_TRY_OUT_CONTAINER, { containerId });
  }

  public getItemImage(imageId: string): Observable<any> {
    return this._http.get(this.getImageApiUrl(imageId));
  }

  public getAutocompleteOptions(property: string): Observable<any> {
    return this._http.get(`${ URL.GET_AUTOCOMPLETE_OPTIONS }${ property }`);
  }

  public getLastOpenedItems(): Observable<any> {
    return this._http.get(URL.GET_LAST_OPENED_ITEMS);
  }

  public setUserSettings(userSettings: UserSettings): Observable<any> {
    return this.post(URL.SET_USER_SETTINGS, { userSettings });
  }
}
