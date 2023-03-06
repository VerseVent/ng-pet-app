import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { setSettings } from './weather.actions';
import { WeatherService } from '../../../service/weather/weather.service';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/service/storage/localstorage.service';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private storageService: LocalStorageService,
    private weatherService: WeatherService
  ) {}

  userSettingsEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setSettings),
        switchMap((setting) =>
          this.weatherService.postUserSettings(setting).pipe(
            tap((response) =>{
              console.log('SUCCESS:: USER SETTINGS EFFECT: ', response)
              this.storageService.setUserSettings(response);
            }
            ),
            catchError((err) => {
              console.log('ERROR:: USER SETTINGS EFFECT: ', err);
              throw EMPTY;
            })
          )
        )
      );
    },
    { dispatch: false }
  );
}
