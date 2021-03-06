import { DEFAULT_CURRENCY_CODE, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout/layout.component";
import { MaterialModule } from "./modules/material/material.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MarketComponent } from "./views/market/market.component";
import { ItemComponent } from "./components/item/item.component";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ItemListFiltersComponent } from "./components/item-list-filters/item-list-filters.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EquipmentComponent } from "./views/equipment/equipment.component";
import { YesNoDialogComponent } from "./components/yes-no-dialog/yes-no-dialog.component";
import { LoginDialogComponent } from "./components/login-dialog/login-dialog.component";
import { AuthenticationInterceptor } from "./services/authentication-interceptor";
import { OpenContainerDialogComponent } from "./components/open-container-dialog/open-container-dialog.component";
import { ShowDrawnItemDialogComponent } from "./components/show-drawn-item-dialog/show-drawn-item-dialog.component";
import { TextColorDirective } from "./directives/text-color.directive";
import { BackgroundColorDirective } from "./directives/background-color.directive";
import { SnakeBorderCardComponent } from "./components/snake-border-card/snake-border-card.component";
import { TryOutComponent } from "./views/try-out/try-out.component";
import { ImageContainerComponent } from "./components/image-container/image-container.component";
import { AutocompleteFormFieldComponent } from "./components/autocomplete-form-field/autocomplete-form-field.component";
import { UserMenuComponent } from "./components/user-menu/user-menu.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LastOpenedItemsListComponent } from "./components/last-opened-items-list/last-opened-items-list.component";
import { LastOpenedItemComponent } from "./components/last-opened-item/last-opened-item.component";
import { DEFAULT_CURRENCY, DEFAULT_LANGUAGE } from "./data/constants-messages.data";


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    MarketComponent,
    ItemComponent,
    ItemListComponent,
    ItemListFiltersComponent,
    EquipmentComponent,
    YesNoDialogComponent,
    LoginDialogComponent,
    OpenContainerDialogComponent,
    ShowDrawnItemDialogComponent,
    TextColorDirective,
    BackgroundColorDirective,
    SnakeBorderCardComponent,
    TryOutComponent,
    ImageContainerComponent,
    AutocompleteFormFieldComponent,
    UserMenuComponent,
    LastOpenedItemsListComponent,
    LastOpenedItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: DEFAULT_LANGUAGE,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }, {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: DEFAULT_CURRENCY
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
