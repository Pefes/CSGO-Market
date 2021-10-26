import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, HostListener, Input } from "@angular/core";
import { LastOpenedItem } from "src/app/models/last-opened-item.model";

@Component({
  selector: "last-opened-item",
  templateUrl: "./last-opened-item.component.html",
  styleUrls: ["./last-opened-item.component.scss"],
  animations: [
    trigger("hover", [
      state("mouseEntered", style({
        opacity: 1
      })),
      state("mouseLeft", style({
        opacity: 0
      })),
      transition("mouseEntered <=> mouseLeft", animate("250ms"))
    ])
  ]
})
export class LastOpenedItemComponent {

  public isHovered: boolean = false;

  @Input() public item: LastOpenedItem = {} as LastOpenedItem;

  @HostListener("mouseenter") mouseEnterHandler(): void {
    this.isHovered = true;
  }

  @HostListener("mouseleave") mouseLeaveHandler(): void {
    this.isHovered = false;
  }

  constructor() { }
}
