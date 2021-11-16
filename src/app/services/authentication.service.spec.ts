import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import * as moment from "moment";
import { of } from "rxjs";
import { ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY, ACCESS_TOKEN_STORAGE_KEY, API_URL, MARKET_URL, SUCCESS, USER_DATA_STORAGE_KEY } from "../data/constants-messages.data";
import { UserData, UserSettings } from "../models/user-data.model";
import { ApiService } from "./api.service";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationService", () => {
  let service: AuthenticationService;
  let apiService: ApiService;
  const username: string = "username1";
  const password: string = "password1";
  const testUserData: UserData = { username: "username1", cash: 5 };
  const testUserSettings: UserSettings = { darkTheme: true, language: "pl" };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [{ provide: ApiService }]
    });
    service = TestBed.inject(AuthenticationService);
    apiService = TestBed.inject(ApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call api service when user want to register", () => {
    spyOn(apiService, "post");
    service.register(username, password);
    expect(apiService.post).toHaveBeenCalledWith(API_URL.REGISTER, { username, password });
  });

  it("should call api service when user want to login and set session when success", () => {
    spyOn(apiService, "post").and.returnValue(of({ status: SUCCESS }));
    spyOn<any>(service, "_setSession");
    service.logIn(username, password).subscribe();
    expect(apiService.post).toHaveBeenCalledWith(API_URL.LOGIN, { username, password });
    expect(service["_setSession"]).toHaveBeenCalledWith({ status: SUCCESS });
  });

  it("should remove user data from local storage and redirect when user log out", () => {
    spyOn(service["_userData"], "next").and.callThrough();
    spyOn(service["_router"], "navigateByUrl").and.callThrough();
    spyOn(window.localStorage, "removeItem").and.callThrough();
    service.logOut();
    expect(service["_userData"].next).toHaveBeenCalledWith(null);
    expect(service["_router"].navigateByUrl).toHaveBeenCalledWith(MARKET_URL);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(ACCESS_TOKEN_STORAGE_KEY);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(USER_DATA_STORAGE_KEY);
  });

  it("should return proper access token", () => {
    const testAccessToken: string = "testAccessToken";
    spyOn(window.localStorage, "getItem").and.returnValue(testAccessToken);
    expect(service.getAccesToken()).toEqual(testAccessToken);
  });

  it("should return true if user is logged in", () => {
    spyOn<any>(service, "_getExpirationTime").and.returnValue(moment().add(1, "day"));
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it("should return false when user is not logged in", () => {
    spyOn<any>(service, "_getExpirationTime").and.returnValue(moment().subtract(1, "day"));
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it("should add value to user's cash and save data to local storage", () => {
    spyOn<any>(service, "_saveUserDataToLocalStorage");
    spyOn(service, "isLoggedIn").and.returnValue(true);
    service["_userData"].next(testUserData);
    service.addValueToUserCash(5);
    expect(service["_saveUserDataToLocalStorage"]).toHaveBeenCalled();
    expect(service["_userData"].value).toEqual({ ...testUserData, cash: 10 });
  });

  it("should save user settings in rest api and locale storage", () => {
    spyOn(apiService, "setUserSettings").and.returnValue(of({ status: SUCCESS }));
    spyOn<any>(service, "_saveUserDataToLocalStorage");
    spyOn(service["_userData"], "next").and.callThrough();
    service["_userData"].next(testUserData);
    service.saveUserSettings(testUserSettings);
    expect(service["_saveUserDataToLocalStorage"]).toHaveBeenCalled();
    expect(service["_userData"].next).toHaveBeenCalledWith({ ...testUserData, userSettings: testUserSettings });
  });
});
