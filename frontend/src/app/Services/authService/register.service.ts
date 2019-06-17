import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  registerUrl = environment.backend_url+"/register";
  data : any;

  getRespForRegister(obj:{}): any{
      return this.httpClient.post(`${this.registerUrl}`,obj,
          {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).map(response =>{
        const result = response;
        return result;
      }).catch(error => {
        console.log(error.statusText);
        return Observable.throw(error);
      });
  }
}
