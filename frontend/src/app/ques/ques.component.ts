import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { RespComponent } from '../resp/resp.component';

@Component({
  selector: 'app-ques',
  templateUrl: './ques.component.html',
  styleUrls: ['./ques.component.css']
})
export class QuesComponent implements OnInit {

  ques = 'No Question presented';

  constructor(private chat: ChatService, private resp: RespComponent){ }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.ques = msg;
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
