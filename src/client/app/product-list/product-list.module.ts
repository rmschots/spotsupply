import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';

@NgModule({
  imports: [CommonModule, ProductListRoutingModule],
  declarations: [ProductListComponent],
  exports: [ProductListComponent]
})

export class ProductListModule {
}
