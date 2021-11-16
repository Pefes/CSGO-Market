import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import { MARKET_URL } from "../data/constants-messages.data";
import { AuthGuardService } from "./auth-guard.service";
import { AuthenticationService } from "./authentication.service";

describe("AuthGuardService", () => {
  let service: AuthGuardService;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [{ provide: AuthenticationService }]
    });
    service = TestBed.inject(AuthGuardService);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return true if user is logged in (pass user)", () => {
    spyOn(authenticationService, "isLoggedIn").and. returnValue(true);
    expect(service.canActivate()).toBeTruthy();
  });

  it("should return false if user is not logged in and redirect user to market page", () => {
    spyOn(authenticationService, "isLoggedIn").and. returnValue(false);
    spyOn(service["_router"], "navigateByUrl");
    expect(service.canActivate()).toBeFalsy();
    expect(service["_router"].navigateByUrl).toHaveBeenCalledWith(MARKET_URL);
  });
});
