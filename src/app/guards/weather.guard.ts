import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import * as fromRoot from '../app.reducer';
import * as LOAD from '../shared/stores/loading/loading.actions';
import { PagesGuardService } from './guard.service';
import { map, Observable, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../service/storage/localstorage.service';
import { ISetting } from '../interfaces/ISetting';
import { setSettings } from '../shared/stores/weather/weather.actions';

@Injectable()
export class WeatherGuard implements CanActivate {
  constructor(
    private router: Router,
    private guardService: PagesGuardService,
    private store: Store<fromRoot.State>,
    private storageService: LocalStorageService
  ) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(new LOAD.StartLoading());
    return this.guardService.verifyUser().pipe(
      map((res) => {
        if (res) {
          const userSettings: void | ISetting =
            this.storageService.getUserSettings();
          if (userSettings) {

            this.store.dispatch(setSettings(userSettings));
          }
          this.store.dispatch(new LOAD.StopLoading());
          return true;
        } else {
          this.handleUnauthorized();
          this.store.dispatch(new LOAD.StopLoading());
          return false;
        }
      }),
      catchError((err) => {
        console.log('ERROR:: guard:', err);

        this.handleUnauthorized();
        this.store.dispatch(new LOAD.StopLoading());
        return of(false);
      })
    );
  }
  handleUnauthorized() {
    Notiflix.Notify.failure('Unauthorized ;_)');
    this.router.navigate(['/login']);
  }
}
