import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Injectable()
export class HeroDetailResolveService implements Resolve<Hero> {
  blah: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<Hero> | boolean {
    let id = +route.params['id'];

    return this.heroService.getHero(id).then((hero: Hero) => {
      return hero || (this.router.navigate(['/heroes']) && false);
    });
  }
}
