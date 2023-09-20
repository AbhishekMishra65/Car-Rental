import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
model:LoginRequest
constructor(private authService: AuthService,private router: Router,private cookieService: CookieService,private toastr:ToastrService) {
  this.model ={
    email: '',
    password: ''
  }
}
onFormSubmit(){
  this.authService.login(this.model).subscribe({
    next:(response)=>{
      if(response.token){
        this.toastr.success(`Login Successfull`);
      //Set cookie
      this.cookieService.set('Authorization', `Bearer ${response.token}`,
      undefined, '/' , undefined, true, 'Strict');
      this.router.navigateByUrl('/');
      
      this.authService.setUser({
        email:response.email,
        role:response.role,
        userId: response.userId,
        name: response.name
      });
    }
    else{
      this.toastr.warning('Invalid Credentials,Please try again');
    }
    },
    error:(response)=>{
      this.toastr.warning('Invalid Credentials,Please try again');
    }
  })
}


}
