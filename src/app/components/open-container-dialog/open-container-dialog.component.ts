import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CSGO_API_IMAGE_URL } from "src/app/data/variables-messages.data";
import { ApiService } from "src/app/services/api.service";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";

@Component({
  selector: 'open-container-dialog',
  templateUrl: './open-container-dialog.component.html',
  styleUrls: ['./open-container-dialog.component.scss']
})
export class OpenContainerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OpenContainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public itemData: any,
    private _dialogService: MatDialog,
    private _api: ApiService) {
      console.log(itemData);
  }

  public buttonClickHandler(result: boolean): void {
    if (result) {
      this._api.openContainer(this.itemData._id).subscribe(console.log);
    }

    this.dialogRef.close();
  }

  public getIconFullUrl(iconUrl: string): string {
    return `${ CSGO_API_IMAGE_URL }${ iconUrl }`;
  }
}
