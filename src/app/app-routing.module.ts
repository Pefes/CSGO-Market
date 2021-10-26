import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EQUIPMENT_URL, MARKET_URL, TRY_OUT_URL } from "./data/constants-messages.data";
import { AuthGuardService } from "./services/auth-guard.service";
import { EquipmentComponent } from "./views/equipment/equipment.component";
import { MarketComponent } from "./views/market/market.component";
import { TryOutComponent } from "./views/try-out/try-out.component";

const routes: Routes = [
  { path: "", redirectTo: "/market", pathMatch: "full" },
  { path: MARKET_URL, component: MarketComponent },
  { path: EQUIPMENT_URL, component: EquipmentComponent, canActivate: [AuthGuardService] },
  { path: TRY_OUT_URL, component: TryOutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
