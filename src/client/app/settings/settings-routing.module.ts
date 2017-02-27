import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PreferencesComponent } from './preferences/preferences.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: 'current-order',
            component: CurrentOrderComponent
          },
          {
            path: 'order-history',
            component: OrderHistoryComponent
          },
          {
            path: 'preferences',
            component: PreferencesComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsRoutingModule {
}
