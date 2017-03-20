import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthGuard } from '../shared/services/authguard/auth-guard.service';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: '/settings/preferences',
            pathMatch: 'full'
          },
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
