import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AppConstant } from './app.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLogin = false;
  loginSubject: BehaviorSubject<boolean>;
  intervalId: any;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('jwt');
    this.loginSubject = new BehaviorSubject<boolean>(token ? true : false);
    this.loginSubject.subscribe((data) => {
      this.isLogin = data;
    });
  }

  checkSession() {
    return this.loginSubject.asObservable();
  }
  removeSession() {
    localStorage.removeItem('jwt');
    this.loginSubject.next(false);
    if (this.intervalId) clearInterval(this.intervalId);
  }
  setSession(token: string) {
    localStorage.setItem('jwt', token);
    this.loginSubject.next(true);
    this.startSessionTimeout();
  }

  startSessionTimeout() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      Swal.fire({
        title: 'Warning!',
        text: 'Session will expire in 20 seconds',
        confirmButtonText: 'Refresh',
        cancelButtonText: 'Close',
        showCancelButton: true,
        timer: 20000,
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.generateAccessToken().subscribe(
            (response: any) => {
              this.setSession(response.token);
              Swal.fire('Success!', response.message, 'success');
            },
            (error: any) => {
              Swal.fire('Error!', error.error.message, 'error');
            }
          );
        } else if (result.isDismissed) {
          setTimeout(() => {
            this.http
              .post(
                `${AppConstant.API_URL}/logout`,
                {},
                { withCredentials: true }
              )
              .subscribe(() => {
                this.removeSession();
                clearInterval(this.intervalId);
              });
          }, 1000 * 20);
        }
      });
    }, 1000 * 40);
  }

  generateAccessToken(): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.post(`${AppConstant.API_URL}/refresh`, { token });
  }
}
