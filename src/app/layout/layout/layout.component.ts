import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component } from "@angular/core";

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent {

  public showSideNav: boolean = true;

  constructor(private _breakpointObserver: BreakpointObserver) {
    this._breakpointObserver.observe("(max-width: 530px)").subscribe((result: BreakpointState) => {
      this.showSideNav = !result.matches;
  });
  }
}
