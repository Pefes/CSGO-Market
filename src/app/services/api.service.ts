import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { API_URL as URL } from "../data/variables-messages.data";
import { ItemListFiltersData } from "../models/item-list-filters-data.model";
import { ItemListPaginatorData } from "../models/item-list-paginator-data.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  public getApiUrl(path: string): string {
    return `${ environment.apiUrl }${ path }`;
  }

  public getImageApiUrl(imageId: string): string {
    return `${ environment.apiUrl }${ URL.GET_ITEM_IMAGE }${ imageId }`;
  }

  private _post(url: string, params: any): Observable<any> {
    return this._http.post(this.getApiUrl(url), params);
  }

  public getMarketItems(params: { filtersData: ItemListFiltersData, paginatorData: ItemListPaginatorData }): Observable<any> {
    return this._post(URL.GET_MARKET_ITEMS, params).pipe(map((data: any) => data.data));
  }

  public getOwnedItems(params: { filtersData: ItemListFiltersData, paginatorData: ItemListPaginatorData }): Observable<any> {
    return this._post(URL.GET_OWNED_ITEMS, params).pipe(map((data: any) => data.data));
  }

  public buyItem(itemId: string): Observable<any> {
    return this._post(URL.BUY_ITEM, { itemId });
  }
  
  public sellItem(itemId: string): Observable<any> {
    return this._post(URL.SELL_ITEM, { itemId });
  }

  public openContainer(containerId: string): Observable<any> {
    return this._post(URL.OPEN_CONTAINER, { containerId });
  }

  public getItemImage(imageId: string): Observable<any> {
    return this._http.get(`${ this.getApiUrl(URL.GET_ITEM_IMAGE) }${ imageId }`);
  }
}
