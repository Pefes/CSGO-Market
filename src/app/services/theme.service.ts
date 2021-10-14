import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ThemeService {

  private _renderer: Renderer2 = {} as Renderer2;

  constructor(private _rendererFactory: RendererFactory2) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  public setDarkTheme(darkTheme: boolean): void {
    if (darkTheme) {
      this._renderer.addClass(document.body, "darkTheme");
      this._renderer.removeClass(document.body, "lightTheme");
    } else {
      this._renderer.addClass(document.body, "lightTheme");
      this._renderer.removeClass(document.body, "darkTheme");
    }
  }
}
