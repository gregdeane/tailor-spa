import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ManageHeroesComponent } from './manage-heroes.component';

/**
 * Note component-less route under `AdminComponent`. Components aren't required just to group routes.
 * Doing this also allows us to guard child routes.
 *
 * See: https://angular.io/docs/ts/latest/guide/router.html#!#component-less-route
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            canActivateChild: [AuthGuardService],
            children: [
              { path: 'heroes', component: ManageHeroesComponent },
              { path: '', component: AdminDashboardComponent }
            ]
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
