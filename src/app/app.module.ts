import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';
import { DashboardComponent } from './dashboard.component';
import { DialogService } from './dialog/dialog.service';
import { HeroModule } from './heroes/hero.module';
import { HeroSearchComponent } from './heroes/hero-search.component';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HeroModule,
    LoginRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroSearchComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    CanDeactivateGuardService,
    DialogService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
