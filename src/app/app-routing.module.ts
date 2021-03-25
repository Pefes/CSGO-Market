import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MarketComponent } from "./views/market/market.component";

const routes: Routes = [
  { path: "home", component: MarketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
