import { DebugElement, ElementRef, Renderer2 } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";

import { SnakeBorderCardComponent } from "./snake-border-card.component";

describe("SnakeBorderCardComponent", () => {
  let component: SnakeBorderCardComponent;
  let fixture: ComponentFixture<SnakeBorderCardComponent>;
  let debug: DebugElement;
  let renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnakeBorderCardComponent],
      imports: [MatCardModule],
      providers: [Renderer2]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeBorderCardComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    renderer = fixture.componentRef.injector.get(Renderer2);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call method to change mat card color and spans background color after init", () => {
    spyOn<any>(component, "_setMatCardColor");
    spyOn<any>(component, "_setSpanElementsBackgroundColor");
    fixture.detectChanges();
    expect(component["_setMatCardColor"]).toHaveBeenCalled();
    expect(component["_setSpanElementsBackgroundColor"]).toHaveBeenCalled();
  });

  it("should set mat card color after init", () => {
    fixture.detectChanges();
    spyOn(renderer, "setStyle").and.callThrough();
    component["_setMatCardColor"]();
    expect(renderer.setStyle).toHaveBeenCalledWith(component["_matCard"].nativeElement, "color", component.themeColor);
  });

  it("should set background color for spans after init", () => {
    fixture.detectChanges();
    spyOn(renderer, "setStyle").and.callThrough();
    component["_setSpanElementsBackgroundColor"]();
    component["_spanElements"].forEach((spanElement: ElementRef, index: number) => {
      expect(renderer.setStyle).toHaveBeenCalledWith(spanElement.nativeElement, "background", component["_getBackgroundGradient"](90 * index + 90, component.themeColor));
    });
  });

  it("should return proper background gradient", () => {
    expect(component["_getBackgroundGradient"](100, "black")).toEqual("linear-gradient(100deg, transparent, black)");
  });
});
