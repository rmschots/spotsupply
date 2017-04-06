import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { Ng2MapModule } from 'ng2-map';
import { HomeRoutingModule } from './home-routing.module';
import { BeachModel } from '../shared/framework/models/beach.model';
import { RestfulGateway } from '../shared/framework/gateways/restful.gateway';

@NgModule({
  imports: [SharedModule, HomeRoutingModule, Ng2MapModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [BeachModel, RestfulGateway]
})
export class HomeModule {
}
