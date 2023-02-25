import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import * as fromRoot from '../app.reducer';
import * as AUTH from '../shared/auth.actions';

@Injectable()
export class PagesGuardService {
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}
  verifyUser() {
    return this.http.get('auth').pipe(
      tap((res) => {
        console.log('SUCCESS::guard service: ', res);
        this.store.dispatch(new AUTH.AuthUser());
      })
    );
  }
}
