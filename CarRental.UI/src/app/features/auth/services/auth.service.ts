import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { RegisterRequest } from '../models/register-request.model';
import { Agreement } from '../../agreement/models/agreement.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined); // default value is undefiend because user can not be logged in always.

  constructor(private http: HttpClient,private cookieService:CookieService) { }

  login(request: LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,request)
  }

  register(request:RegisterRequest){
    return this.http.post<any>(`${environment.apiBaseUrl}/api/auth/register`,request)
  }
  
  setUser(user: User){
    this.$user.next(user);
    localStorage.setItem("user-email",user.email);
    localStorage.setItem("user-role",user.role);
    localStorage.setItem("userId",user.userId);
    localStorage.setItem("userName",user.name);
  }

  user():Observable<User| undefined>{
    return this.$user.asObservable();
  }

  getUser():User | undefined{
    const email= localStorage.getItem('user-email');
    const role= localStorage.getItem('user-role');
    const userId= localStorage.getItem('userId');
    const userName= localStorage.getItem('userName');

    if(email && role && userId && userName){
      const user:User={
        email:email,
        role:role,
        userId:userId,
        name: userName
      };

      return user;
    }
    return undefined;
  }

  logout(){
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);  // means user is logout
  }

  updateAdminAcceptReturn(agreementId:string,existingAgreement:Agreement):Observable<Agreement>{
    return this.http.put<Agreement>(`${environment.apiBaseUrl}/api/rentalagreement/AdminAcceptReturn/${agreementId}?addAuth=true`,existingAgreement);
  }

  allAgreements():Observable<Agreement[]>{
    return this.http.get<Agreement[]>(`${environment.apiBaseUrl}/api/rentalagreement/AllAgreement?addAuth=true`)
  }

}
