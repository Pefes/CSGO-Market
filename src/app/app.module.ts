import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout/layout.component";
import { MaterialModule } from "./modules/material/material.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MarketComponent } from "./views/market/market.component";
import { ItemComponent } from "./components/item/item.component";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ItemListFiltersComponent } from './components/item-list-filters/item-list-filters.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    MarketComponent,
    ItemComponent,
    ItemListComponent,
    ItemListFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
