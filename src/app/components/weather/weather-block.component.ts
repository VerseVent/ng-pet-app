import { Component } from '@angular/core';
import { IMessage } from 'src/app/interfaces/IMessage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather-block.component.html',
})
export class WeatherBlockComponent {
  content: string = '';
  cities$: Observable<any>;
  constructor(
  ) {}

}
