import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CSGO_API_IMAGE_URL } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";

@Component({
  selector: 'show-drawn-item-dialog',
  templateUrl: './show-drawn-item-dialog.component.html',
  styleUrls: ['./show-drawn-item-dialog.component.scss']
})
export class ShowDrawnItemDialogComponent {
  public propertiesToShow: string[] = ["name", "type", "exterior", "rarity", "price"];

  constructor(
    public dialogRef: MatDialogRef<ShowDrawnItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {
      console.log(data);
    }

  public buttonClickHandler(): void {
    this.dialogRef.close();
  }

  public getIconFullUrl(): string {
    return `${ CSGO_API_IMAGE_URL }${ this.data.iconUrl }`;
  }
}
