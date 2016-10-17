import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './heroes/hero.model';
import { HeroService } from './heroes/hero.service';

@Component({
  selector: 'dashboard-component',
  styles: [require('./dashboard.component.scss')],
  template: `
    <h3>Top Heroes</h3>
    <div class="row">
      <div *ngFor="let hero of heroes"
           (click)="onSelect(hero)"
           class="col-md-3">
        <div class="alert alert-info module">
          {{ hero.name }}
        </div>
      </div>
    </div>
    <hero-search-component></hero-search-component>
  `
})
export class DashboardComponent {
  heroes: Hero[];

  constructor(
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  onSelect(hero: Hero): void {
    let link = ['/hero', hero.id];
    this.router.navigate(link);
  }
}
