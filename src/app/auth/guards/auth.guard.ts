import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private cookieService:CookieService) {}

  canActivate(): boolean {
    if (this.cookieService.get('token')) {
      return true;
    }
    this.router.navigate(['\login']);
    return false;
  }
  
}