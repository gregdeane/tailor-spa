import { Component, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { DialogService } from '../dialog/dialog.service';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail-component',
  styles: [require('./hero-detail.component.scss')],
  template: `
    <div *ngIf="hero">
      <h2>{{ hero.name }}</h2>
      <form #heroDetailForm="ngForm">
        <div class="form-group row">
          <label for="hero-id" class="col-sm-1 col-form-label">ID:</label>
          <div class="col-sm-11">
            <input name="hero-id"
                   id="hero-id"
                   class="form-control"
                   value="{{ hero.id }}"
                   disabled>
           </div>
        </div>
        <div class="form-group row">
          <label for="hero-name" class="col-sm-1 col-form-label">Name:</label>
          <div class="col-sm-11">
            <input [(ngModel)]="editName"
                   name="hero-name"
                   id="hero-name"
                   class="form-control"
                   placeholder="name"
                   [attr.disabled]="!isLoggedIn() || null">
           </div>
        </div>
        <button (click)="back()" class="btn btn-secondary">Back</button>
        <button *ngIf="isLoggedIn()"
                (click)="save()"
                class="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('*', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({ opacity: 0, transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class HeroDetailComponent {
  @HostBinding('@routeAnimation') get routeAnimation() { return true; }
  @HostBinding('style.display') get display() { return 'block'; }
  @HostBinding('style.position') get position() { return 'absolute'; }

  hero: Hero;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private dialogService: DialogService,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.route.data.forEach((data: { hero: Hero }) => {
      this.editName = data.hero.name;
      this.hero = data.hero;
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    // allow synchronous navigation if no changes. otherwise, use dialog service
    return !this.hero || this.hero.name === this.editName || this.dialogService.confirm();
  }

  save(): void {
    this.hero.name = this.editName;
    this.heroService.update(this.hero).then(() => this.back());
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  back(): void {
    this.location.back();
  }
}
