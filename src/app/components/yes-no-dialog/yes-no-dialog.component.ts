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
    this.title = data.title ?? this.title;
    this.contentText = data.contentText ?? this.contentText;
    this.showYesButton = data.showYesButton ?? this.showYesButton;
    this.showNoButton = data.showNoButton ?? this.showNoButton;
    this.showCancelButton = data.showCancelButton ?? this.showCancelButton;
  }

  public buttonClickHandler(result: boolean | null): void {
    this.dialogRef.close(result);
  }
}
