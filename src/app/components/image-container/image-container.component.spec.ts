import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ImageContainerComponent } from "./image-container.component";
import { ApiService } from "../../services/api.service";
import { DebugElement } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { NO_IMAGE_URL } from "src/app/data/variables-messages.data";


describe("ImageContainerComponent", () => {
  let component: ImageContainerComponent;
  let fixture: ComponentFixture<ImageContainerComponent>;
  let debug: DebugElement;
  let apiService: ApiService;
  const URL_FROM_API: string = "urlFromApi";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageContainerComponent],
      providers: [ApiService],
      imports: [HttpClientModule, MatDialogModule, MatProgressSpinnerModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageContainerComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;

    apiService = debug.injector.get(ApiService);
    spyOn(apiService, "getImageApiUrl").and.returnValue(URL_FROM_API);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show spinner when loading image and hide img element", () => {
    const matSpinner: DebugElement = debug.query(By.css("mat-spinner"));
    const img: DebugElement = debug.query(By.css("img"));

    expect(component.imageLoading).toBeTruthy();
    expect(matSpinner).toBeDefined();
    expect(img.nativeElement.classList).toContain("hideImage");
  });

  it("should hide spinner when image loaded and show img element", () => {
    const img: DebugElement = debug.query(By.css("img"));
    img.nativeElement.dispatchEvent(new Event("load"));
    fixture.detectChanges();

    const matSpinner: DebugElement = debug.query(By.css("mat-spinner"));
    expect(component.imageLoading).toBeFalsy();
    expect(matSpinner).toBeNull();
    expect(img.nativeElement.classList).not.toContain("hideImage");
  });

  it("should show default image when loading image failed", () => {
    spyOn(component, "errorHandler").and.callThrough();
    const img: DebugElement = debug.query(By.css("img"));
    img.nativeElement.dispatchEvent(new Event("error"));
    fixture.detectChanges();

    expect(component.errorHandler).toHaveBeenCalled();
    expect(img.nativeElement.attributes.getNamedItem("src").value).toEqual(NO_IMAGE_URL);
  });

  it("should show background on default", () => {
    const background: DebugElement = debug.query(By.css(".backgroundImage"));
    expect(background).toBeDefined();
  });

  it("should hide background when not needed", () => {
    component.showBackgroundImage = false;
    fixture.detectChanges();
    const background: DebugElement = debug.query(By.css(".backgroundImage"));
    expect(background).toBeNull();
  });

  it("should get image url from api service", () => {
    const img: DebugElement = debug.query(By.css("img"));
    component.imageUrlId = "customImageUrlId";
    fixture.detectChanges();
    expect(apiService.getImageApiUrl).toHaveBeenCalled();
    expect(img.nativeElement.attributes.getNamedItem("src").value).toEqual(URL_FROM_API);
  });
});
