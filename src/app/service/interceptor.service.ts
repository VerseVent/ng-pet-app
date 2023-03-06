import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptApi implements HttpInterceptor {
  protectedRoutes: Array<string> = ['auth', 'weather/settings'];
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.get('skip')) {
      request = request.clone({
        headers: request.headers.delete('skip'),
      });
      return next.handle(request);
    }
    return next.handle(this.handleRequest(request));
  }
  handleRequest(request: HttpRequest<any>) {
    const token = localStorage.getItem('auth_token');
    console.log(
      'Request handler (interceptor): ',
      this.protectedRoutes.includes(request.url),
      request.url
    );
    if (this.protectedRoutes.includes(request.url)) {
      return request.clone({
        url: 'http://localhost:3001/api/' + request.url,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request.clone({
      url: 'http://localhost:3001/api/' + request.url,
    });
  }
}
