import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { request } from 'http';
import { nextTick } from 'process';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private authservice: LoginService ) { }
  
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
   
    request = request.clone({
      headers: request.headers.set('authorization', this.authservice.token||''),
    })
    return next.handle(request)
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptorService,
  multi: true
}
