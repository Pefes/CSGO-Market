import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {

  public showSideNav: boolean = true;

  constructor(private _breakpointObserver: BreakpointObserver) {}

  public ngOnInit(): void {
    this._breakpointObserver.observe("(max-width: 530px)").subscribe((result: BreakpointState) => {
      this.showSideNav = !result.matches;
    });
  }
}
