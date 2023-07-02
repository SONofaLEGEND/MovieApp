import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isNavbarWidth16 = true;
  isLoggedin!:boolean;
  toggleNavbarWidth() {
    this.isNavbarWidth16 = !this.isNavbarWidth16;

  }

  constructor(private cookieService:CookieService, private authService:AuthService, private router:Router, private location: Location){}

  ngOnInit(): void {
    if (this.cookieService.get('token')){
      this.isLoggedin = true;
    }
    else {
      this.isLoggedin = false;
    }
  }

  async logOut(){
    this.authService.logout();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);

}
}
