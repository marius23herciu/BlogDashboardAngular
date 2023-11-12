import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserComment } from '../models/user-comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseApiUrl = 'https://localhost:7246'

  constructor(private http: HttpClient) { }

  loadUnapprovedComments(): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(this.baseApiUrl + '/api/comments/unapproved-comments' )
  }

  approveComment(id: string): Observable<boolean> {
    return this.http.put<boolean>(this.baseApiUrl + '/api/comments/approve-' + id , id)
  }

  deleteComment(id: string) {
    return this.http.delete<boolean>(this.baseApiUrl + '/api/comments/' + id)
   }
}
