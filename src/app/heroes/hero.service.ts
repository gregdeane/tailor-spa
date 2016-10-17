import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { environment } from '../environment';
import { Hero } from './hero.model';

@Injectable()
export class HeroService {
  private db: string = `${environment.db}/heroes`;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.db)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.db}/${hero.id}`;

    return this.http.put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.db, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.db}/${id}`;

    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // illustrate why Promise is necessary
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000))
      .then(() => this.getHeroes());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
