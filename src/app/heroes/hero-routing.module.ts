import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CanDeactivateGuardService } from '../guards/can-deactivate-guard.service';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailResolveService } from './hero-detail-resolve.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'heroes',
        component: HeroListComponent
      },
      {
        path: 'hero/:id',
        component: HeroDetailComponent,
        canDeactivate: [CanDeactivateGuardService],
        resolve: {
          hero: HeroDetailResolveService
        }
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    HeroDetailResolveService
  ]
})
export class HeroRoutingModule {}
