import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/authService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username : string;
  private password : string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    if(this.validate()){
      let obj = {"username":this.username,"password":this.password};
      this.loginService.getRespForLogin(obj).subscribe(data =>{
        console.log('In component: '+data.message);
        localStorage.setItem('sessionToken',data.message.split(":")[1]);
        this.navigateToMain();
      }, err =>{
        console.log(err);
      });
    }
  }

  navigateToMain(){
    this.router.navigate(['/qweqjvnvjiadsafkajkjsaiqwoqninviw']);
  }

  validate(){
    return true;
  }

}
