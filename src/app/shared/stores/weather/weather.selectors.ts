import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWeather, WEATHER_FEATURE } from './weather.reducer';

export const weatherFeature = createFeatureSelector<IWeather>(WEATHER_FEATURE);

export const selectWeatherCity = createSelector(
  weatherFeature,
  (state: IWeather) => state.city
);

export const selectWeatherIsNewsletter = createSelector(
  weatherFeature,
  (state: IWeather) => state.isNewsletter
);
