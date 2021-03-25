import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";


@NgModule({
  declarations: [],
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
