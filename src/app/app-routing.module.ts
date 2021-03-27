import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EquipmentComponent } from "./views/equipment/equipment.component";
import { MarketComponent } from "./views/market/market.component";

const routes: Routes = [
  { path: "market", component: MarketComponent },
  { path: "equipment", component: EquipmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
