import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   userEmail = ''
   isLoggedIn$!: Observable<boolean>;
   grd = false


   constructor( public auth: AuthService, private router: Router){}

  async ngOnInit() {
    if( localStorage.getItem('jwt')! != null  )
    {
      this.auth.isLoggedInGuard = true
       this.grd = true
      this.userEmail = localStorage.getItem('user')!;
        (await this.auth.isAuthenticated(localStorage.getItem('jwt')!)).subscribe({
        next: (response: boolean) => {
          this.router.navigate([""])
          .then(() => {
            this.grd = true
        this.userEmail = localStorage.getItem('user')!;
          });
        }
      })
      
    }
    else{
      this.auth.isLoggedInGuard = false
      this.grd = false
    }
    
  }
  
   onLogout(){
    this.auth.logout()
    this.grd = false
    this.userEmail = ''
    this.router.navigate(["/login"])
   }

}
