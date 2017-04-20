import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BeachModel } from '../shared/framework/models/beach.model';
import { NguiMapModule } from '@ngui/map';
import { LoginModel } from '../shared/framework/models/login.model';
import { LocationModel } from '../shared/framework/models/location.model';

@NgModule({
  imports: [SharedModule, HomeRoutingModule, NguiMapModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [BeachModel, LoginModel, LocationModel]
})
export class HomeModule {
}
