import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[backgroundColor]'
})
export class BackgroundColorDirective implements OnInit {

  @Input() public backgroundColor: string = "";
  private readonly _DEFAULT_COLOR: string = "#b0c3d9";

  constructor(private _elementRef: ElementRef) {}

  public ngOnInit(): void {
    const color = this.backgroundColor ? `#${ this.backgroundColor }` : this._DEFAULT_COLOR;
    this._elementRef.nativeElement.style.backgroundColor = color;
  }
}
