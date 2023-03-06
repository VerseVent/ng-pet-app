import { Component } from '@angular/core';
import { IMessage } from 'src/app/interfaces/IMessage';
import { WebsocketService } from '../../service/weather/websocket.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather-block.component.html',
})
export class WeatherBlockComponent {
  content: string = '';
  cities$: Observable<any>;
  constructor(
    private wsService: WebsocketService,

  ) {}

  received: IMessage[] = [];
  sent: IMessage[] = [];


  sendMsg(type: string): void {
    let message: IMessage = {
      type,
    };
    // message.source = 'localhost';
    // message.content = this.content;
    this.sent.push(message);

    this.wsService.messages.next(message);
  }
}
