import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherGuard } from './guards/weather.guard';
import { PagesGuardService } from './guards/guard.service';
import { UiGuard } from './guards/ui.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [UiGuard],
    component: LoginComponent,
  },
  {
    path: 'signup',
    canActivate: [UiGuard],
    component: SignupComponent,
  },
  {
    path: 'weather',
    canActivate: [WeatherGuard],
    component: WeatherComponent,
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [WeatherGuard, PagesGuardService, UiGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
