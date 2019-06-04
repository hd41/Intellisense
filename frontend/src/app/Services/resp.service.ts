import { Injectable } from '@angular/core';
import { RespSocketService } from './resp-socket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RespService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: RespSocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  // this message has to be in json format
  sendMsg(msg) {
    this.messages.next(msg);
  }
}
