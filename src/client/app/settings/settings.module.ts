import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { SharedModule } from '../shared/shared.module';
import { EditPreferenceComponent } from './preferences/edit-preference/edit-preference.component';
import { NguiMapModule } from '@ngui/map';

@NgModule({
  imports: [SharedModule, SettingsRoutingModule, NguiMapModule],
  declarations: [
    SettingsComponent,
    CurrentOrderComponent,
    OrderHistoryComponent,
    PreferencesComponent,
    EditPreferenceComponent
  ],
  exports: [SettingsComponent],
  entryComponents: [EditPreferenceComponent]
})

export class SettingsModule {
}
