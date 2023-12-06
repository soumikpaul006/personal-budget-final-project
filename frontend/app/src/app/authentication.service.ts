import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLogin = false;
  loginSubject: BehaviorSubject<boolean>;

  constructor() {
   let token = localStorage.getItem("jwt");
    this.loginSubject = new BehaviorSubject<boolean>(token ? true : false);
    this.loginSubject.subscribe((data)=>{
      this.isLogin = data;
    }
    );
  }

  checkSession(){
    return this.loginSubject.asObservable();
  }
  removeSession(){
    localStorage.removeItem("jwt");
    this.loginSubject.next(false);
  }
  setSession(token:string){
    localStorage.setItem("jwt",token);
    this.loginSubject.next(true);
  }
}
