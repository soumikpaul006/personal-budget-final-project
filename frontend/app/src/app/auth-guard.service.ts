import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private authenticationService : AuthenticationService) { }

  canActivate(): boolean {
   return this.authenticationService.isLogin;
  }
}
