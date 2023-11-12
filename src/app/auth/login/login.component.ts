
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticatedResponse } from 'src/app/models/authenticated-response';
import { LoginDetails } from 'src/app/models/login-details';
import { LoginModel } from 'src/app/models/login-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginModel = {email:'', password:''}
  guard = false
  constructor(private http: HttpClient, private router: Router, private auth: AuthService){}

  OnInit(){
    this.guard = this.auth.isLoggedInGuard
  }

  async onSubmit(loginForm: NgForm){
    await this.http.post<AuthenticatedResponse>("https://localhost:7246/api/auth/login", this.credentials, {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    })
    .subscribe({
      next: (response: AuthenticatedResponse) => {
        const token = response.token;
        const refreshToken = response.refreshToken;
        localStorage.setItem("jwt", token); 
        localStorage.setItem("refreshToken", refreshToken);
        this.auth.loggedIn.next(true)


        this.auth.loadUser().subscribe({
          next: (response) => {
            this.auth.user = response
            console.log(response)
          }
        })
        setTimeout(()=>{                        
          localStorage.setItem('user', this.auth.user)
          this.auth.loggedIn.next(true)
          this.auth.isLoggedInGuard = true
          this.router.navigate(["/"]);
      }, 500);
      },
      error: (err: HttpErrorResponse) => alert('Wrong username and/or password.')
    })
  }
  }
  


 


