import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Moment } from "moment";
import { Observable } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import { ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY, ACCESS_TOKEN_STORAGE_KEY, LOGIN_URL, REGISTER_URL } from "../data/variables-messages.data";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  public register(username: string, password: string): Observable<any> {
    return this._http.post(REGISTER_URL, { username, password }).pipe(
      shareReplay()
    );
  }

  public login(username: string, password: string): Observable<any> {
    return this._http.post(LOGIN_URL, { username, password }).pipe(
      tap(this._setSession),
      shareReplay()
    );
  }

  private _setSession(authenticationResponse: any): void {
    const expiresAt = moment().add(authenticationResponse.data.expiresIn, "milliseconds");

    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, authenticationResponse.data.accessToken);
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY, JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY);
  }

  public getExpirationTime(): Moment | null {
    const expirationString = localStorage.getItem(ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY);
    
    if (expirationString) {
      const expiresAt = JSON.parse(expirationString ?? "");
      return moment(expiresAt);
    }
    
    return null;
  }

  public getAccesToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  public isLoggedIn(): boolean {
    const expirationTime = this.getExpirationTime();
    return expirationTime !== null && moment().isBefore(expirationTime);
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
