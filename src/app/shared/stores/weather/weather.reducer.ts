import { createReducer, on } from '@ngrx/store';
import * as weatherActions from './weather.actions';
export interface IWeather {
  city: string;
  isNewsletter: boolean;
}

export const weatherState: IWeather = {
  city: 'Kyiv',
  isNewsletter: false,
};

export const WEATHER_FEATURE = 'weather';

export const weatherReducer = createReducer(
  weatherState,
  on(weatherActions.setSettings, (state, { city, isNewsletter }) => {
    debugger;
    return {
      ...state,
      city,
      isNewsletter,
    };
  })
);
