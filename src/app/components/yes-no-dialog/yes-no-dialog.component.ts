import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { YesNoDialogData } from "src/app/models/yes-no-dialog-data.model";

@Component({
  selector: 'yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent {

  public title: string = "Are you sure?";
  public contentText: string = "";
  public showYesButton: boolean = true;
  public showNoButton: boolean = true;
  public showCancelButton: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData
  ) {
    data.title ? this.title = data.title : null;
    data.contentText ? this.contentText = data.contentText : null;
    data.showYesButton ? this.showYesButton = data.showYesButton : null;
    data.showNoButton ? this.showNoButton = data.showNoButton : null;
    data.showCancelButton ? this.showCancelButton = data.showCancelButton : null;
  }

  public buttonClickHandler(result: boolean | null): void {
    this.dialogRef.close(result);
  }
}
