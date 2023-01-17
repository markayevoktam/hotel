// import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class MyFilterService implements HttpInterceptor{

//   constructor() { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // filter
//     let token = localStorage.getItem('token');
   


//     if(token){
//       const authReq = req.clone({
//         headers: req.headers.set('Content-Type', 'application/json')
//         .set('Authorization', "Bearer "+token)
//       });
//       return next.handle(authReq);
//     }


//     return next.handle(req);
//   }
// }
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyFilterService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // filter
    let token = localStorage.getItem('token');



    if(token){
      const authReq = req.clone({
        headers: req.headers
        
        .set('Authorization', "Bearer "+token)
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}