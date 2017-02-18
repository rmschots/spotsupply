import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SettingsComponent],
  exports: [SettingsComponent]
})

export class SettingsModule {
}
