import { Component, OnInit } from "@angular/core";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "try-out",
  templateUrl: "./try-out.component.html",
  styleUrls: ["./try-out.component.scss"]
})
export class TryOutComponent implements OnInit {

  public tryOutItems: Item[] = [];

  constructor(private _api: ApiService) {  }

  public ngOnInit(): void {
    this._api.getTryOutItems().subscribe(items => {
      this.tryOutItems = [...items];
    });
  }

}
