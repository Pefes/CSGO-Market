import { Component, Input, OnInit } from "@angular/core";
import { NO_IMAGE_URL } from "src/app/data/constants-messages.data";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "image-container",
  templateUrl: "./image-container.component.html",
  styleUrls: ["./image-container.component.scss"]
})
export class ImageContainerComponent {

  public imageLoading: boolean = true;
  
  @Input() public imageUrlId: string = "";
  @Input() public showBackgroundImage: boolean = true;

  constructor(private _api: ApiService) { }

  public imageLoadedHandler(): void {
    this.imageLoading = false;
  }

  public getImageUrl(): string {
    return this.imageUrlId ? this._api.getImageApiUrl(this.imageUrlId) : "";
  }

  public errorHandler(event: any): void {
    event.target.src = NO_IMAGE_URL;
  }
}
