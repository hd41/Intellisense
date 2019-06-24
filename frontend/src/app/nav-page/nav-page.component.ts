import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.css']
})
export class NavPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  moveToMain(){
    this.router.navigate(['/main/'+sessionStorage.getItem('sessionToken')]);
  }

  askQuestion(){
    this.router.navigate(['/quest/'+sessionStorage.getItem('sessionToken')]);
  }

}
