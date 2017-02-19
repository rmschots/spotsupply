import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'store', component: StoreComponent }
    ])
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreRoutingModule { }
