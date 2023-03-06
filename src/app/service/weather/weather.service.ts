import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISetting } from '../../interfaces/ISetting';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  postUserSettings(setting: ISetting) {
    return this.http.post<ISetting>('weather/settings', setting);
  }
}
