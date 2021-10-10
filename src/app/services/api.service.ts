import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { marketItems } from "../data/market-items.data";
import { CSGO_API_IMAGE_URL, CSGO_API_URL } from "../data/variables-messages.data";
import { ItemListFiltersData } from "../models/item-list-filters-data.model";
import { ItemListPaginatorData } from "../models/item-list-paginator-data.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  private _getUrl(path: string): string {
    return `${ environment.apiUrl }${ path }`;
  }

  public getMarketItems(params: { filtersData: ItemListFiltersData, paginatorData: ItemListPaginatorData }): Observable<any> {
    return this._http.post(this._getUrl("api/getMarketItems"), params).pipe(map((data: any) => data.data));

    // MOCK DATA
    // return of(marketItems).pipe(map((response: any) => {
    //   return {
    //     ...response,
    //     items_list: Object.values(response.items_list)
    //   };
    // }));
  }

  public getOwnedItems(params: { filtersData: ItemListFiltersData, paginatorData: ItemListPaginatorData }): Observable<any> {
    return this._http.post(this._getUrl("api/getOwnedItems"), params).pipe(map((data: any) => data.data));
  }

  public buyItem(itemId: string): Observable<any> {
    return this._http.post(this._getUrl("api/buyItem"), { itemId });
  }
  
  public sellItem(itemId: string): Observable<any> {
    return this._http.post(this._getUrl("api/sellItem"), { itemId });
  }

  public openContainer(containerId: string): Observable<any> {
    return this._http.post(this._getUrl("api/openContainer"), { containerId });
  }

  public getItemImage(imageId: string): Observable<any> {
    return this._http.get(`${ CSGO_API_IMAGE_URL }${ imageId }`);
  }
}
