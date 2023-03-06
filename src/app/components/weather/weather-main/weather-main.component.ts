import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWeatherCity } from '../../../shared/stores/weather/weather.selectors';

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherMainComponent implements OnInit{
  constructor(private router: Router, private store:Store) {}
  city:Observable<string>;
  ngOnInit(){
    this.city = this.store.select(selectWeatherCity);
  }
  toSettings() {
    this.router.navigate(['/weather-settings']);
  }
}
