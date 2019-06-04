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
export class QuesServiceService {

  constructor(private httpClient:HttpClient) { }

  latestQuesUrl = environment.backend_url+"/get_latest_ques";
  postNewQues = environment.backend_url+"/post_new_ques";

  getLatestQuestion(): any{
        return this.httpClient.get(`${this.latestQuesUrl}`).map(response =>{
            const response1 = response;
          return response1;
        }).catch(error => {
          console.log(error.statusText);
          return Observable.throw(error);
        });
  }

  postLatestQues(obj:{}){
    return this.httpClient.post(`${this.postNewQues}`,obj,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).map(response =>{
      return response;
    }).catch(error => {
      console.log(error.statusText);
      return Observable.throw(error);
    });
  }

}
