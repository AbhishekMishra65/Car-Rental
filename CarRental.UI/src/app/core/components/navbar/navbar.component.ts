import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user?: User;  // can be undefinied
  
  constructor(private authService: AuthService,private router:Router){ }
  
  ngOnInit(): void {
    this.authService.user().subscribe({
      next:(response)=>{
        this.user=response;
      }
    });

    this.user = this.authService.getUser();  // from preventing logout when we are already login beacuse of page reload
    
  }
  
  logout(){
    if(confirm("Are you sure want to logout?")){
    this.authService.logout();
    this.router.navigateByUrl('/');
    }
  }
}
