import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { MARKET_URL } from "../data/constants-messages.data";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router) { }

  public canActivate(): boolean {
    if (!this._authenticationService.isLoggedIn()) {
      this._router.navigateByUrl(MARKET_URL);
      return false;
    }

    return true;
  }
}
