import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Hero } from './hero.model';
import { HeroSearchService } from './hero-search.service';

@Component({
  selector: 'hero-search-component',
  styles: [require('./hero-search.component.scss')],
  template: `
    <div class="search-component">
      <h4>Hero Search</h4>
      <form>
        <input #searchBox
               (keyup)="search(searchBox.value)"
               class="form-control">
      </form>
      <div class="list-group">
        <a *ngFor="let hero of heroes | async"
             (click)="onSelect(hero)"
             class="list-group-item list-group-item-action search-result">
          {{ hero.name }}
        </a>
      </div>
    </div>
  `,
  providers: [HeroSearchService]
})
export class HeroSearchComponent {
  private searchTerms = new Subject<string>();
  heroes: Observable<Hero[]>;

  constructor(
    private router: Router,
    private heroSearchService: HeroSearchService
  ) {}

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms between events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable (cancel previous)

        // return the http search observable
        ? this.heroSearchService.search(term)

        // or the observable of empty heroes if no search term
        : Observable.of<Hero[]>([]))

      .catch(this.handleError);
  }

  // push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  onSelect(hero: Hero): void {
    let link = ['/hero', hero.id];
    this.router.navigate(link);
  }

  private handleError(error: any): Observable<Hero[]> {
    console.log(error);
    return Observable.of<Hero[]>([]);   // return observable of empty heroes
  }
}
