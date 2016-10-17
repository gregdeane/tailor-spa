import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from './auth/auth-guard.service';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'admin',
        canLoad: [AuthGuardService],
        // async/lazy loading routes
        // https://github.com/iurii-kyrylenko/angular2-webpack/blob/master/src/app/app.routing.ts
        loadChildren: () => new Promise(resolve =>
          (require as any).ensure([], () =>
            resolve(require('./admin/admin.module').AdminModule)
          )
        )
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
