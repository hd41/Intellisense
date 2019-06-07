import { Component, OnInit } from '@angular/core';
import { RespServiceService } from '../Services/respService/resp-service.service';
import { QuesServiceService } from '../Services/quesService/ques-service.service';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-resp-page',
  templateUrl: './resp-page.component.html',
  styleUrls: ['./resp-page.component.css']
})
export class RespPageComponent implements OnInit {

  private responder: string;
  private message: string;
  private ques: string;
  private mobile: string;

  constructor(private respService: RespServiceService, private quesService: QuesServiceService,
    private router: Router, private alerts: AlertsService) { }

  ngOnInit() {
    this.quesService.getLatestQuestion().subscribe(data =>{
        this.ques = data.message;
        console.log(data);
    }, err =>{
      console.log(err);
    });
  }

  submitResp(){
    if(this.validResponse()){
      let obj = {"responder":this.responder,"response":this.message,"mobile":this.mobile};
      this.respService.submitResp(obj).subscribe(data =>{
          console.log("Response Sent");
          this.router.navigate(['/done']);
      }, err =>{
        console.log(err);
      });
    }else{

    }
  }

  validResponse(){
    if(this.responder.length > 0 && this.message.length > 0){
      var phoneno = /^\d{10}$/;
      if(this.mobile.match(phoneno)){
        return true;
      }else{
        this.alerts.setMessage('All fields are required','error');
        // this.alerts.setMessage('Configurations saved successfully!','success');
      }
    }
    return false;
  }

}
