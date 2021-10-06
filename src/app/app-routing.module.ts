import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EQUIPMENT_URL, MARKET_URL } from "./data/variables-messages.data";
import { AuthGuardService } from "./services/auth-guard.service";
import { EquipmentComponent } from "./views/equipment/equipment.component";
import { MarketComponent } from "./views/market/market.component";

const routes: Routes = [
  { path: MARKET_URL, component: MarketComponent },
  { path: EQUIPMENT_URL, component: EquipmentComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
