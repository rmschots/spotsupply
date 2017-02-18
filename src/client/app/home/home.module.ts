import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { Ng2MapModule } from 'ng2-map';

@NgModule({
  imports: [CommonModule, SharedModule, Ng2MapModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule {
}
