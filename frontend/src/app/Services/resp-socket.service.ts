import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class RespSocketService {

  // Our socket connection
  private socket;
  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.backend_url);

    let observable = new Observable(observer => {
        this.socket.on('response', (data) =>{
          observer.next(data);
        })
        return () => {
          this.socket.disconnect();
        }
    });

    let observer = {
        next: (data: Object) => {
            this.socket.emit('response', JSON.stringify(data));
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}
