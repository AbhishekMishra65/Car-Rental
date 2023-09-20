import { Component } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model:RegisterRequest
  constructor(private authService:AuthService,private toastr:ToastrService,private router:Router){
    this.model={
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      address:''
    }
  }
  onFormSubmit(){
    if(this.model.password== this.model.confirmPassword){
    this.authService.register(this.model).subscribe({
      next:(response)=>{
        this.toastr.success('Proceed to Login');
        this.router.navigateByUrl('/login');
      }
    })
  }
  else{
    this.toastr.warning('Password & Confirm Password Does not match');
  }
  }
}
