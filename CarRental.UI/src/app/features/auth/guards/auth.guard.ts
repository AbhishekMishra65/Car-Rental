import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode'

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const user = authService.getUser();

  //check for the jwt token
  let token = cookieService.get('Authorization');

  if (token && user) {
    //check if token is not expired, it will be checked by decoding the jwt token
    token = token.replace('Bearer ', '');    // remove or replace the bearer keyword in token with empty string
    const decodedToken: any = jwt_decode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    }
    else{
      //token is still valid
      if(user.role.includes('Admin')){
        return true
      }
      else{
        //alert("Unauthorized");
        toastr.warning('You are Unauthorized');
        return false;
      }
    }
  }
  else {
    authService.logout();
    toastr.info('You have to login first');
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })   //redirect back to the state they were at.
  }
};
