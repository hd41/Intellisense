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

  private askedBy : string = sessionStorage.getItem('sessionToken');
  private message: string;
  private password: string;

  private newDiv: Boolean = false;

  constructor(private quesService: QuesServiceService, private router: Router, private alerts: AlertsService) { }

  ngOnInit() {
    this.quesService.getLatestQuestion(sessionStorage.getItem('sessionToken')).subscribe(data =>{
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
    if(true){
      let obj = {"askedBy":sessionStorage.getItem('sessionToken'),"message":this.message,"password":this.password};
      this.quesService.postLatestQues(obj).subscribe(data =>{
          this.ques = this.message;
          this.toggleQues();
          this.router.navigate(['/done']);
      }, err =>{
        console.log(err);
      });
    }
  }

}
