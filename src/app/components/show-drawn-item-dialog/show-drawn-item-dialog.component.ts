import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CSGO_API_IMAGE_URL, OPEN_CONTAINER_DIALOG_PANEL_CLASS } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";

@Component({
  selector: 'show-drawn-item-dialog',
  templateUrl: './show-drawn-item-dialog.component.html',
  styleUrls: ['./show-drawn-item-dialog.component.scss']
})
export class ShowDrawnItemDialogComponent implements OnInit {
  public propertiesToShow: string[] = ["name", "type", "exterior", "rarity", "price"];

  constructor(
    public dialogRef: MatDialogRef<ShowDrawnItemDialogComponent>,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(MAT_DIALOG_DATA) public data: Item) {
      console.log(data);
    }

  public ngOnInit(): void {
    const matDialogElement: any = this._document.querySelector(`.${ OPEN_CONTAINER_DIALOG_PANEL_CLASS } mat-dialog-container`);
    matDialogElement.style.boxShadow = `0px 0px 200px 0px #${ this.data.rarityColor }`;
  }
  
  public buttonClickHandler(): void {
    this.dialogRef.close();
  }

  public getIconFullUrl(): string {
    return `${ CSGO_API_IMAGE_URL }${ this.data.iconUrl }`;
  }
}
