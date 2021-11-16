import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { ApiService } from "./api.service";

describe("ApiService", () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
