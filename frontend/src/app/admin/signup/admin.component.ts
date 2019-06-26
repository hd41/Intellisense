import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../Services/authService/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  private username : string;
  private name : string;
  private password : string;
  private mobile: string;
  private hideElement : Boolean = true;

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    if(this.validate()){
      let obj = {"username":this.username,"name":this.name,"password":this.password,"mobile":this.mobile};
      this.registerService.getRespForRegister(obj).subscribe(data =>{
        console.log('In component: '+data.message);
        this.navigateToLogin();
      }, err =>{
        console.log(err);
      });
    }
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  validate(){
    return true;
  }

}
