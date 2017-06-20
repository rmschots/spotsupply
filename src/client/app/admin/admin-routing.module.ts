import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from '../shared/services/guards/auth-guard.service';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: '/admin/admin-home',
            pathMatch: 'full'
          },
          {
            path: 'admin-home',
            component: AdminHomeComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  schemas: []
})
export class AdminRoutingModule {
}
