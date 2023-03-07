import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMessage } from 'src/app/interfaces/IMessage';
import { environment } from 'src/environment/environment';
import { LocalStorageService } from '../storage/localstorage.service';

const WEATHER_BASE_URL = environment.WS_URL;

@Injectable()
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<any>;
  private userToken = this.storageService.getUserToken();
  constructor(private storageService: LocalStorageService) {}
  
  public createConnection() {
    this.messages = <Subject<IMessage>>this.connect(
      WEATHER_BASE_URL + `token=${this.userToken}`
    ).pipe(
      map((response: MessageEvent): IMessage => {
        let data = JSON.parse(response.data);
        return data;
      })
    );
  }

  public connect(url: string): AnonymousSubject<MessageEvent> {
    this.subject = this.create(url);
    return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);

      return ws.close.bind(ws);
    });
    let observer: Observer<MessageEvent> = {
      next: (data: MessageEvent) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
      error: (err: any): void => {
        console.log('ERROR::Websocket: ', err);
      },
      complete: (): void => {
        console.log('COMPLETE::Websocket: ');
      },
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
