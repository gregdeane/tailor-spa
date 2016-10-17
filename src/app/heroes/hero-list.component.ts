import { Component } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-list-component',
  styles: [require('./hero-list.component.scss')],
  template: `
    <h2>Heroes</h2>
    <form *ngIf="isLoggedIn()" class="form-inline">
      <div class="form-group">
        <label for="hero-name">Hero Name:</label>
        <input #heroName
               name="hero-name"
               id="hero-name"
               class="form-control">
      </div>
      <button (click)="add(heroName.value); heroName.value=''"
              class="btn btn-primary">
        Add
      </button>
    </form>
    <div class="list-group heroes">
      <a *ngFor="let hero of heroes"
         (click)="onSelect(hero)"
         [class.selected]="isSelected(hero)"
         class="list-group-item list-group-item-action">
        <span class="badge">{{ hero.id }}</span>
        <span>{{ hero.name }}</span>
        <button *ngIf="isLoggedIn()"
                (click)="delete(hero); $event.stopPropagation()"
                type="button"
                class="close">
          <span>&times;</span>
        </button>
      </a>
    </div>
  `
})
export class HeroListComponent {
  heroes: Hero[];
  selectedId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.selectedId = +params['id'];
      this.heroService.getHeroes()
        .then(heroes => this.heroes = heroes);
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return }

    this.heroService.create(name)
      .then(hero => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => this.heroes = this.heroes.filter(h => h !== hero));
  }

  isSelected(hero: Hero): boolean {
    return hero.id === this.selectedId;
  }

  onSelect(hero: Hero): void {
    // this.selectedId = crisis.id;
    //
    // // Navigate with relative link
    // this.router.navigate([crisis.id], { relativeTo: this.route });

    this.router.navigate(['/hero', hero.id]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
