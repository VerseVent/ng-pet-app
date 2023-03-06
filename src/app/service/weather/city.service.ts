import { ICity } from './../../interfaces/ICity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { of } from 'rxjs';
import * as Notiflix from 'notiflix';

@Injectable()
export class CityService {
  constructor(private http: HttpClient) {}

  private cityLimit: number = 3;
  private citiesApiHeaders = {
    'X-Api-Key': environment.CITIES_API_KEY,
    skip: 'true',
  };

  private citiesApiUrl = `https://api.api-ninjas.com/v1/city?limit=${this.cityLimit}&name=`;

  getCities$(city: string) {
    if (!city.length) return of([]);

    return this.http
      .get<ICity[]>(`${this.citiesApiUrl}${city}`, {
        headers: this.citiesApiHeaders,
      })
      .pipe(
        map((cities) => {
          if (cities.length) {
            return cities.map((city: ICity) => city.name);
          }
          throw new Error('City not found');
        }),
        tap((value) => console.log(value)),
        catchError((err) => {
          Notiflix.Notify.failure(err.message);
          return of([]);
        })
      );
  }
}
