import { LoginModel } from './../models/login-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticatedResponse } from '../models/authenticated-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = 'https://localhost:7246'
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLoggedInGuard: boolean = false

  user: string = localStorage.getItem('user')! 
  jwt = localStorage.getItem('jwt')!

  constructor(private http: HttpClient,
    private router: Router) { }

   async isAuthenticated(token: string):Promise<Observable<boolean>> {
      return this.http.get<boolean>(this.baseApiUrl + '/api/auth/token-valid-or-not-' + token)
   }
  async getEmail(): Promise<Observable<string>> {
    return this.http.get(this.baseApiUrl + '/api/auth/get-email', {responseType: 'text'})
  }
 async getToken():Promise<string> {
    const token = localStorage.getItem("jwt");
    if (token!=null){
      return token
    }
    return ""
  }
  isNotAuthenticated():Observable<boolean> {
    return this.http.get<boolean>(this.baseApiUrl + '/api/auth/invalid-token')
 }
 
  logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem('user')
    this.loggedIn.next(false)
    this.isLoggedInGuard = false
    this.router.navigate(["/login"]);
  }

  loadUser(): Observable<string>{
    console.log(this.user)
    return this.http.get(this.baseApiUrl + '/api/auth/get-email', {responseType: 'text'})
  }
  
  isLoggedIn(){
    return this.loggedIn.asObservable()
  }
}
