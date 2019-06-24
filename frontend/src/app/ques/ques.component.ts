import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { RespComponent } from '../resp/resp.component';
import { environment } from '../Services/environment';

@Component({
  selector: 'app-ques',
  templateUrl: './ques.component.html',
  styleUrls: ['./ques.component.css']
})
export class QuesComponent implements OnInit {

  ques = 'No Question presented';

  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = environment.frontend_url+'/response/'+sessionStorage.getItem('sessionToken');

  constructor(private chat: ChatService, private resp: RespComponent){ }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      var msgParts = msg.split(":");
      this.ques = msgParts[0];
      sessionStorage.setItem('sessionToken',msgParts[1]);
    })
    this.sendMessage();
  }

  sendMessage() {
    let data = {
      "message": sessionStorage.getItem('sessionToken')
    };
    this.chat.sendMsg(data);
  }

}
