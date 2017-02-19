import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'product-list', component: ProductListComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
