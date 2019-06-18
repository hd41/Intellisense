import { Component, OnInit } from '@angular/core';
import { RespService } from '../Services/resp.service';

@Component({
  selector: 'app-resp',
  templateUrl: './resp.component.html',
  styleUrls: ['./resp.component.css']
})

export class RespComponent implements OnInit {

  idx : number=-1;
  index1: number[] =[];
  index2: number[] = [];
  lst_idx: number;
  messages: string[] = [];
  names: string[] = [];
  msgToSend = "ASD";

  constructor(private chat: RespService){ }

  ngOnInit() {
    //interval for ticker
    setInterval(() => this.moveTicker(), 2000);

    this.chat.messages.subscribe(msg => {

      console.log("Received response: "+msg);

      if(msg == "$"){  // condition where question is reset
        this.clearMessages();
      }else{
        var splitVal = msg.split(":");

        if(splitVal[2] == sessionStorage.getItem('sessionToken')){
          if(splitVal[0] == "undefined"){
            this.names.push("Anonymous");
          }else{
            this.names.push(splitVal[0]);
          }
          this.idx++ ;

          this.index1.push(this.idx);
          this.index2 = this.index1.slice(0, this.idx);
          this.lst_idx = this.index1[this.index1.length-1];

          this.messages.push(splitVal[1]);
        }

      }
    })
  }

  sendMessage() {
    this.chat.sendMsg(this.msgToSend);
  }

  moveTicker(){
      var poppedElement = this.index1.shift();
      if(poppedElement != null){
        this.index1.splice(this.index1.length - 1, 0, poppedElement);
        this.index2 = this.index1.slice(0, this.idx);
        this.lst_idx = this.index1[this.index1.length-1];
      }
  }

  clearMessages(){
    this.index1 = [];
    this.messages = [] ;
    this.names = [];
  }

}
