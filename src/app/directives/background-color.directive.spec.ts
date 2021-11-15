import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DEFAULT_BACKGROUND_COLOR_DIRECTIVE } from "../data/constants-messages.data";
import { BackgroundColorDirective } from "./background-color.directive";

@Component({
  selector: "test-component",
  template: "<div class='testClass' backgroundColor></div>"
})
class TestComponent {}

describe("BackgroundColorDirective", () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, BackgroundColorDirective]
    });
  });

  it("should set default background color", async () => {
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const testDiv: DebugElement = fixture.debugElement.query(By.css(".testClass"));
    expect(testDiv.nativeElement.style.backgroundColor).toEqual(DEFAULT_BACKGROUND_COLOR_DIRECTIVE);
  });

  it("should set background color from input", async () => {
    await TestBed.overrideComponent(TestComponent, {
      set: {
        template: "<div class='testClass' backgroundColor='df1c1c'></div>"
      }
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const testDiv: DebugElement = fixture.debugElement.query(By.css(".testClass"));
    expect(testDiv.nativeElement.style.backgroundColor).toEqual("rgb(223, 28, 28)");
  });
});
