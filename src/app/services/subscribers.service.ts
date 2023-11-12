import { Subscriber } from './../models/subscriber';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  baseApiUrl = 'https://localhost:7246'

  constructor(private http: HttpClient) { }

  loadSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(this.baseApiUrl + '/api/subscribers' )
}

  deleteSubscriber(id: string) {
    return this.http.delete<boolean>(this.baseApiUrl + '/api/subscribers/' + id)
   }

}
