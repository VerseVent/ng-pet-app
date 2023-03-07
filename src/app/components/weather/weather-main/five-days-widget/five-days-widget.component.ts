import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  IFiveDayWeather,
  IFiveDayWeatherUnit,
} from '../../../../interfaces/IOneDayWeather';

@Component({
  selector: 'app-five-days-widget',
  templateUrl: './five-days-widget.component.html',
  styleUrls: ['./five-days-widget.component.scss'],
})
export class FiveDaysWidgetComponent implements OnChanges {
  @Input() fiveDayWeather: IFiveDayWeatherUnit[];
  currentDayIndex: number;
  currentDate: Date;
  fiveArr: Array<number> = [1, 2, 3, 4, 5];
  ngOnChanges() {
    if (this.fiveDayWeather) {
      this.currentDate = new Date(this.fiveDayWeather[0].dt * 1000);
      this.currentDayIndex = this.currentDate.getUTCDate();
    }
    this.fiveDayWeather = this.fiveDayWeather?.filter(
      (unit: IFiveDayWeatherUnit) => {
        const currentUnitDay = new Date(unit.dt * 1000).getUTCDate();
        if (currentUnitDay <= this.currentDayIndex + 4) {
          return unit;
        }
        return;
      }
    );
  }
}
