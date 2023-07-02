import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token!: string;

  constructor (private _http:HttpClient, private authService: AuthService, private router:Router, private cookieService: CookieService) {}
  t: string | null | undefined;
  submitted = false;
  errorMessage:string|null = null;
  loginForm!: FormGroup;
  loading = false;
  transitionBetweenPages() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
    this.transitionBetweenPages();

  }
  


  async login(loginForm: any){
    this.submitted = true;
    
    if(this.loginForm.invalid) {return}
    else {

      this.cookieService.deleteAll();
      if(await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)){
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
        }).then(
          (willNavigate) => {
            if(willNavigate) {
              this.router.navigate(['/']);
            }
          }
        );
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.authService.errorMessage
        });
        this.loginForm.reset();
      }

    }
  }

  
  
}