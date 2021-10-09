import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CSGO_API_IMAGE_URL, OPEN_CONTAINER_DIALOG_PANEL_CLASS, SUCCESS } from "src/app/data/variables-messages.data";
import { Item } from "src/app/models/item.model";
import { ApiService } from "src/app/services/api.service";
import { ShowDrawnItemDialogComponent } from "../show-drawn-item-dialog/show-drawn-item-dialog.component";

@Component({
  selector: 'open-container-dialog',
  templateUrl: './open-container-dialog.component.html',
  styleUrls: ['./open-container-dialog.component.scss']
})
export class OpenContainerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OpenContainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public itemData: any,
    private _api: ApiService,
    private _dialogService: MatDialog) {}

  public buttonClickHandler(result: boolean): void {
    if (result) {
      this._api.openContainer(this.itemData._id).subscribe(response => {
        if (response.status === SUCCESS) {
          this._dialogService.open(ShowDrawnItemDialogComponent, { panelClass: OPEN_CONTAINER_DIALOG_PANEL_CLASS, data: response.data.drawnItem });
          this.dialogRef.close(true);
        }
      });
    }

    this.dialogRef.close(false);
  }

  public getIconFullUrl(iconUrl: string): string {
    return `${ CSGO_API_IMAGE_URL }${ iconUrl }`;
  }
}
