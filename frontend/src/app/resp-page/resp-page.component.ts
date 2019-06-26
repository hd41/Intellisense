import { Component, OnInit } from '@angular/core';
import { RespServiceService } from '../Services/respService/resp-service.service';
import { QuesServiceService } from '../Services/quesService/ques-service.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  private token: string;
  private q_id: string;

  constructor(private respService: RespServiceService, private quesService: QuesServiceService,
    private router: Router, private alerts: AlertsService, private route: ActivatedRoute ) {
        this.route.params.subscribe( params => {
            console.log(params);
            this.token = params.token;
        });
    }

  ngOnInit() {
    this.quesService.getLatestQuestion(this.token).subscribe(data =>{
        this.ques = data.message;
        this.q_id = data.q_id;
    }, err =>{
      console.log(err);
    });
  }

  submitResp(){
    if(this.validResponse()){
      let obj = {"responder":this.responder,"response":this.message,"mobile":this.mobile, "token":this.token,"q_id":this.q_id};
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
