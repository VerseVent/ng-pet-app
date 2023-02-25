import { Injectable } from '@angular/core';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { AbstractControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { IUser, LoginResponse } from './user-interfaces';
import { catchError, tap } from 'rxjs/operators';
import * as Notiflix from 'notiflix';
import * as AUTH from '../../shared/auth.actions';
import * as LOAD from '../../shared/stores/loading/loading.actions';
import { of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private store: Store<fromRoot.State>, private http: HttpClient) {}

  signUpUser(user: IUser) {
    console.log('User service: ', user);
    this.store.dispatch(new LOAD.StartLoading());

    return this.http.post<string>('auth/signup', user).pipe(
      tap((res) => {
        this.store.dispatch(new LOAD.StopLoading());
        console.log('User Service: ', res);
      })
    );
  }

  loginUser(user: IUser) {
    this.store.dispatch(new LOAD.StartLoading());

    return this.http.post<LoginResponse>('auth/login', user).pipe(
      tap((res) => {
        // We can dispatch here as well
        this.store.dispatch(new AUTH.AuthUser());
        this.store.dispatch(new LOAD.StopLoading());

        console.log('User Service: ', res);
      }),
      catchError((err) => {
        console.log('ERROR:: userService:', err);

        this.store.dispatch(new LOAD.StopLoading());
        throw err;
      })
    );
  }

  logoutUser() {
    localStorage.removeItem('auth_token');
    this.store.dispatch(new AUTH.OffUser());
  }

  isUserValid(email: AbstractControl | null, password: AbstractControl | null) {
    if (email?.errors) {
      Notiflix.Notify.failure(`Email incorrect`);
      return false;
    }

    if (password?.errors) {
      Notiflix.Notify.failure(`Password incorrect`);
      return false;
    }
    return true;
  }
}
