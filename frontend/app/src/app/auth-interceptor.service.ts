import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // You can modify the request here, for example, add headers or tokens
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      },
    });

    // Pass the modified request to the next interceptor or the backend
    return next.handle(modifiedReq);
  }
}
