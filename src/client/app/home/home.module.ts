import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SpotSupplyModel } from '../shared/framework/models/beach.model';
import { NguiMapModule } from '@ngui/map';

@NgModule({
  imports: [SharedModule, HomeRoutingModule, NguiMapModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [SpotSupplyModel]
})
export class HomeModule {
}
