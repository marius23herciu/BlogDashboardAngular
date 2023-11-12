import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   guard: any

  constructor (private auth: AuthService){}
  ngOnInit(): void {
    this.guard = this.auth.isLoggedInGuard
    if(this.auth.jwt != localStorage.getItem('jwt')){
      location.reload()
    }
  }
}
