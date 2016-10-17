import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environment';
import { Hero } from './hero.model';

@Injectable()
export class HeroSearchService {
  private db: string = `${environment.db}/heroes`;

  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    let url = `${this.db}?q=${term}`;

    return this.http.get(url)
      .map((r: Response) => r.json() as Hero[]);
  }
}
