import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as fromRoot from '../app.reducer';
import * as AUTH from '../shared/auth.actions';
import { LocalStorageService } from 'src/app/service/storage/localstorage.service';
import { ISetting } from '../interfaces/ISetting';

@Injectable()
export class PagesGuardService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private store: Store<fromRoot.State>
  ) {}
  verifyUser() {
    return this.http.get<ISetting>('auth').pipe(
      tap((res) => {
        console.log('SUCCESS::guard service: ', res);
        if (this.storageService.getUserSettings()) {
          return this.store.dispatch(new AUTH.AuthUser());
        }
        this.storageService.setUserSettings(res);
        this.store.dispatch(new AUTH.AuthUser());
      })
    );
  }
}
