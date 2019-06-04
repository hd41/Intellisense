import { Component, OnInit } from '@angular/core';
import { QuesServiceService } from '../Services/quesService/ques-service.service';
import { Router } from '@angular/router';

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
  constructor(private quesService: QuesServiceService, private router: Router) { }

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
