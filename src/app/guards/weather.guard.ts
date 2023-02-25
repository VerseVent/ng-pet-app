import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import * as fromRoot from '../app.reducer';
import * as LOAD from '../shared/stores/loading/loading.actions';
import { PagesGuardService } from './guard.service';
import { map, Observable, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class WeatherGuard implements CanActivate {
  constructor(
    private router: Router,
    private guardService: PagesGuardService,
    private store: Store<fromRoot.State>
  ) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(new LOAD.StartLoading());
    return this.guardService.verifyUser().pipe(
      map((res) => {
        if (res) {
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
