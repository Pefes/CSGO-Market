import { Component, Input } from "@angular/core";
import { LastOpenedItem } from "src/app/models/last-opened-item.model";

@Component({
  selector: "last-opened-item",
  templateUrl: "./last-opened-item.component.html",
  styleUrls: ["./last-opened-item.component.scss"]
})
export class LastOpenedItemComponent {

  @Input() public item: LastOpenedItem = {} as LastOpenedItem;

  constructor() { }
}
