import { Component, OnInit } from '@angular/core';
import { QuesServiceService } from '../Services/quesService/ques-service.service';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-ques-page',
  templateUrl: './ques-page.component.html',
  styleUrls: ['./ques-page.component.css']
})
export class QuesPageComponent implements OnInit {

  private ques : string;
  private askedBy : string;
  private message: string;
  private newDiv: Boolean = false;
  constructor(private quesService: QuesServiceService, private router: Router, private alerts: AlertsService) { }

  ngOnInit() {
    this.quesService.getLatestQuestion().subscribe(data =>{
        this.ques = data.message;
        console.log(data);
    }, err =>{
      console.log(err);
    });
  }

  toggleQues(){
    this.newDiv =  this.newDiv == true?false: true;
  }

  submitQues(){
    if(this.validate()){
      let obj = {"askedBy":this.askedBy,"message":this.message};
      this.quesService.postLatestQues(obj).subscribe(data =>{
          this.ques = this.message;
          this.toggleQues();
          this.router.navigate(['/done']);
      }, err =>{
        console.log(err);
      });
    }
  }

  validate(){
    console.log(this.askedBy);
    if(this.askedBy == "sambhav789"){
      console.log(this.message);
      if(this.message == undefined){
        this.router.navigate(['/qweqjvnvjiadsafkajkjsaiqwoqninviw']);
        return false;
      }
      return true;
    }else{
      this.alerts.setMessage('Not authorised to put question.','warn');
    }
    return false;
  }

}
