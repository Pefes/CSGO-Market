import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this._authenticationService.getAccesToken();

    if (accessToken) {
      const requestCloned = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${ accessToken }`)
      });

      return next.handle(requestCloned);
    }

    return next.handle(request);
  }
}
