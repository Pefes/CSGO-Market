import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { marketItems } from "../data/marketItems.data";
import { CSGO_API_IMAGE_URL, CSGO_API_URL } from "../data/variables.data";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  
  constructor(private http: HttpClient) { }

  public getMarketItems(): Observable<any> {
    // return this.http.get(CSGO_API_URL)

    // MOCK DATA
    return of(marketItems).pipe(map((response: any) => {
      return {
        ...response,
        items_list: Object.values(response.items_list)
      }
    }));
  }

  public getItemImage(imageId: string): Observable<any> {
    return this.http.get(`${ CSGO_API_IMAGE_URL }${ imageId }`);
  }
}
