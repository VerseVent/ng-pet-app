import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, timeout } from 'rxjs';
import { WebsocketService } from 'src/app/service/weather/websocket.service';
import { selectWeatherCity } from '../../../shared/stores/weather/weather.selectors';
import { IMessage } from '../../../interfaces/IMessage';

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherMainComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store,
    private wsService: WebsocketService
  ) {}
  city: Observable<string>;
  ngOnInit() {
    this.city = this.store.select(selectWeatherCity);
    // setTimeout(() => {
    this.sendMsg('one');
    // }, 1000);
    // const messages = this.wsService.messages.subscribe(() => {});
    // console.log(messages);
  }
  toSettings() {
    this.router.navigate(['/weather-settings']);
  }
  received: IMessage[] = [];
  sent: IMessage[] = [];

  sendMsg(type: string): void {
    let message: IMessage = {
      type,
    };
    this.wsService.messages.next(message);
    this.wsService.messages.subscribe((messages) => console.log(messages));
    // message.source = 'localhost';
    // message.content = this.content;
    this.sent.push(message);
    // console.log(this.wsService.messages);
  }
}
