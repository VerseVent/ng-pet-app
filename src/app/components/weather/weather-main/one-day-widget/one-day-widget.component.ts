import { Component, Input, OnInit } from '@angular/core';
import { IOneDayWeather } from 'src/app/interfaces/IOneDayWeather';

@Component({
  selector: 'app-one-day-widget',
  templateUrl: './one-day-widget.component.html',
  styleUrls: ['./one-day-widget.component.scss'],
})
export class OneDayWidgetComponent implements OnInit {
  @Input()
  dayWeather: IOneDayWeather;

  constructor() {}

  ngOnInit() {
    console.log(this.dayWeather);
  }
}
