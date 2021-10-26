import { AfterViewInit, Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren } from "@angular/core";

@Component({
  selector: "snake-border-card",
  templateUrl: "./snake-border-card.component.html",
  styleUrls: ["./snake-border-card.component.scss"]
})
export class SnakeBorderCardComponent implements AfterViewInit {

  @Input()
  public themeColor: string = "#00e200";

  @ViewChild("matCard", { read: ElementRef })
  private _matCard: ElementRef = {} as ElementRef;

  @ViewChildren("spanElement")
  private _spanElements: QueryList<ElementRef> = new QueryList<ElementRef>();

  constructor(private _renderer: Renderer2) { }

  public ngAfterViewInit(): void {
    this._setMatCardColor();
    this._setSpanElementsBackgroundColor();
  }

  private _setMatCardColor(): void {
    this._renderer.setStyle(this._matCard.nativeElement, "color", this.themeColor);
  }

  private _setSpanElementsBackgroundColor(): void {
    this._spanElements.forEach((spanElement: ElementRef, index: number) => {
      this._renderer.setStyle(spanElement.nativeElement, "background", this._getBackgroundGradient(90 * index + 90, this.themeColor));
    });
  }

  private _getBackgroundGradient(angle: number, secondaryColor: string): string {
    return `linear-gradient(${ angle }deg, transparent, ${ secondaryColor })`;
  }
}
