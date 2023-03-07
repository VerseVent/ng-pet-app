import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { WebsocketService } from 'src/app/service/weather/websocket.service';
import { selectWeatherCity } from '../../../shared/stores/weather/weather.selectors';
import { IMessage } from '../../../interfaces/IMessage';
import { IFiveDayWeatherUnit } from '../../../interfaces/IOneDayWeather';
import {
  IOneDayWeather,
  IFiveDayWeather,
} from '../../../interfaces/IOneDayWeather';

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherMainComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store,
    private wsService: WebsocketService
  ) {
    console.log('Constructor');
  }

  private destroy$ = new Subject<void>();

  city: Observable<string>;
  oneDayWeather: IOneDayWeather;
  fiveDayWeather: IFiveDayWeatherUnit[];
  isDayWeather: Boolean;

  ngOnInit() {
    this.wsService.createConnection();
    this.city = this.store.select(selectWeatherCity);

    this.wsService.messages
      .pipe(
        takeUntil(this.destroy$),
        tap((weather) => console.log(weather)),
        map((weather) => {
          if (!weather.list) {
            return this.cleanOneDayWeather(weather);
          }

          return weather;
        })
      )
      .subscribe({
        next: (weather) => {
          if (weather.list) {
            this.isDayWeather = false;
            return (this.fiveDayWeather = weather.list);
          }
          this.isDayWeather = true;
          return (this.oneDayWeather = weather);
        },
        error: (err) => {
          console.log('Websocket subscribtion error(connection closed) :', err);
        },
        complete: () => {
          console.log('Websocket subscribtion complete(connection closed)');
        },
      });
    setTimeout(() => {
      this.sendMsg('one');
    }, 1000);
  }
  toSettings() {
    this.router.navigate(['/weather-settings']);
  }

  sendMsg(type: string): void {
    let message: IMessage = {
      type,
    };
    this.wsService.messages.next(message);
  }

  cleanOneDayWeather(weatherMessage: any) {
    delete weatherMessage.base;
    delete weatherMessage.coord;
    delete weatherMessage.name;
    delete weatherMessage.timezone;
    delete weatherMessage.cod;
    delete weatherMessage.visibility;
    return weatherMessage;
  }
  ngOnDestroy(): void {
    this.wsService.messages.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
