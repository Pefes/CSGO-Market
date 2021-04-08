import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { marketItems } from "../data/market-items.data";
import { CSGO_API_IMAGE_URL, CSGO_API_URL } from "../data/variables-messages.data";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  public getMarketItems(): Observable<any> {
    return this._http.get("api/getMarketItems?limit=50").pipe(map((data: any) => data.data));

    // MOCK DATA
    // return of(marketItems).pipe(map((response: any) => {
    //   return {
    //     ...response,
    //     items_list: Object.values(response.items_list)
    //   };
    // }));
  }

  public getOwnedItems(): Observable<any> {
    return this._http.get("api/getOwnedItems?limit=50").pipe(map((data: any) => data.data));
  }

  public buyItem(itemId: string): Observable<any> {
    return this._http.post("api/buyItem", { itemId });
  }

  public getItemImage(imageId: string): Observable<any> {
    return this._http.get(`${ CSGO_API_IMAGE_URL }${ imageId }`);
  }
}
