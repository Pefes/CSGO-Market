import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DEFAULT_TEXT_COLOR_DIRECTIVE } from "../data/constants-messages.data";
import { TextColorDirective } from "./text-color.directive";

@Component({
  selector: "test-component",
  template: "<div class='testClass' textColor></div>"
})
class TestComponent {}

describe("TextColorDirective", () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, TextColorDirective]
    });
  });

  it("should set default text color", async () => {
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const testDiv: DebugElement = fixture.debugElement.query(By.css(".testClass"));
    expect(testDiv.nativeElement.style.color).toEqual(DEFAULT_TEXT_COLOR_DIRECTIVE);
  });

  it("should set text color from input", async () => {
    await TestBed.overrideComponent(TestComponent, {
      set: {
        template: "<div class='testClass' textColor='#df1c1c'></div>"
      }
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const testDiv: DebugElement = fixture.debugElement.query(By.css(".testClass"));
    expect(testDiv.nativeElement.style.color).toEqual("rgb(223, 28, 28)");
  });
});
