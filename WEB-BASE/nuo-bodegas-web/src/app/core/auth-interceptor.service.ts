import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AutenticationService) { }
  intercept( req:HttpRequest<any>, next:HttpHandler):Observable<HttpSentEvent  | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>{
    var token = this.authService.obtenerToken();
    req = req.clone({
      setHeaders:{Authorization: 'bearer '+ token}
    });
    return next.handle(req);
  }
}
