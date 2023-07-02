import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor (private _http:HttpClient, private router: Router) {
    
  }
  errorMessage:string|null = null;
  loading = false;
  transitionBetweenPages() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
  submitted = false;
  signupForm!: FormGroup;
    ngOnInit(): void {
      this.signupForm = new FormGroup({

        Fname: new FormControl(null, Validators.required),
        Lname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        mobile: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),

      });
      this.transitionBetweenPages();
    
    }
    
    signup(signupForm: any){
      this.submitted = true;

      if(this.signupForm.invalid) { return}

      else { 
        
        this._http.post('http://localhost:5500/signup', this.signupForm.value).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Sign-up successful!',
          });
          this.router.navigate(['/login']);

        }, (err) => {
          this.errorMessage = err.error.msg;
          Swal.fire({
            icon: 'error',
            title: 'User already exists',
            text: 'Try loggin in.'
          });
          this.signupForm.reset();
          
        });
        
        

        



      }
    }
    
}
