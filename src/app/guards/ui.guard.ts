import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromRoot from '../app.reducer';
import * as LOAD from '../shared/stores/loading/loading.actions';
import { PagesGuardService } from './guard.service';
import { map, Observable, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class UiGuard implements CanActivate {
  constructor(
    private guardService: PagesGuardService,
    private store: Store<fromRoot.State>
  ) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(new LOAD.StartLoading());
    return this.guardService.verifyUser().pipe(
      map(() => {
        this.store.dispatch(new LOAD.StopLoading());
        return true;
      }),
      catchError(() => {
        this.store.dispatch(new LOAD.StopLoading());
        return of(true);
      })
    );
  }
}
