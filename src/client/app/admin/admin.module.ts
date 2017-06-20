import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';


@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [
    AdminComponent,
    AdminHomeComponent
  ],
  exports: [AdminComponent]
})

export class AdminModule {
}
