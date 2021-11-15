import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { DEFAULT_TEXT_COLOR_DIRECTIVE } from "../data/constants-messages.data";

@Directive({
  selector: "[textColor]"
})
export class TextColorDirective implements OnInit {

  @Input() public textColor: string = "";
  private readonly _DEFAULT_COLOR: string = DEFAULT_TEXT_COLOR_DIRECTIVE;

  constructor(private _elementRef: ElementRef) {}

  public ngOnInit(): void {
    const color = this.textColor || this._DEFAULT_COLOR;
    this._elementRef.nativeElement.style.color = color;
  }
}
