import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { AtBeachGuard } from '../shared/services/guards/at-beach-guard.service';
import { HasCartGuard } from '../shared/services/guards/has-cart-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'store',
        component: StoreComponent,
        canActivate: [AtBeachGuard, HasCartGuard]
      }
    ])
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreRoutingModule { }
