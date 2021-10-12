import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Moment } from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import { ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY, ACCESS_TOKEN_STORAGE_KEY, MARKET_URL, USER_DATA_STORAGE_KEY } from "../data/variables-messages.data";
import { API_URL as URL} from "../data/variables-messages.data";
import { UserData } from "../models/user-data.model";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private _userData: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _api: ApiService
    ) {
    this._getLoggedInUserDataFromStorage();
  }

  public register(username: string, password: string): Observable<any> {
    return this._http.post(this._api.getApiUrl(URL.REGISTER), { username, password }).pipe(
      shareReplay()
    );
  }

  public logIn(username: string, password: string): Observable<any> {
    return this._http.post(this._api.getApiUrl(URL.LOGIN), { username, password }).pipe(
      tap((data) => { this._setSession(data) }),
      shareReplay()
    );
  }

  private _setSession(authenticationResponse: any): void {
    this._userData.next({ ...authenticationResponse.data.userData });
    const expiresAt = moment().add(authenticationResponse.data.expiresIn, "milliseconds");

    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, authenticationResponse.data.accessToken);
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY, JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(this._userData.value));
  }

  public logOut() {
    this._userData.next(null);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY);
    localStorage.removeItem(USER_DATA_STORAGE_KEY);
    
    this._router.navigateByUrl(MARKET_URL);
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

  private _getLoggedInUserDataFromStorage(): void {
    if (this.isLoggedIn() && !this._userData.getValue()) {
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY) ?? "");
      this._userData.next(userDataFromLocalStorage);
    }
  }

  public getLoggedInUserData(): Observable<UserData | null> {
    return this._userData.asObservable();
  }

  public isLoggedIn(): boolean {
    const expirationTime = this.getExpirationTime();
    return expirationTime !== null && moment().isBefore(expirationTime);
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public addValueToUserCash(value: number): void {
    const userData: UserData | null = this._userData.getValue();

    if (!this.isLoggedIn() || !userData?.cash) {
      return;
    }

    this._userData.next({ ...this._userData.getValue(), cash: userData.cash + value });
    localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(this._userData.getValue()));
  }
}
