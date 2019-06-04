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
export class RespServiceService {

  constructor(private httpClient:HttpClient) { }

  respUrl = environment.backend_url+"/resp";

  submitResp(obj:{}): any{
      console.log(obj);
        return this.httpClient.post(`${this.respUrl}`,obj,
            {headers: new HttpHeaders().set('Content-Type', 'application/json')
          }).map(response =>{
          return response;
        }).catch(error => {
          console.log(error.statusText);
          return Observable.throw(error);
        });
  }
}
