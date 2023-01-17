// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class AccountService {
//   hasAnyAuthority(authorities: any): boolean {
//     throw new Error('Method not implemented.');
//   }
//   api = environment.baseApi + "/api/account";

//   private userCache$!: Observable<any>;

//   constructor(private http: HttpClient) { }

//   login(loginParol: any): Observable<any> {
//     return this.http.post(this.api + "/auth", loginParol)
//     .pipe(
//       map((data:any)=>{
//         if(data && data.token){
//             localStorage.setItem('token', data.token);
//         }
//         return data;
//       })
//     )
//   }

//   register(user: any): Observable<any> {
//     return this.http.post(this.api + "/register", user);
//   }

//   identity(){
//     return this.http.get(this.api+"/current");
//   }

// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  api = environment.baseApi + "/api/account";
  private currentUser: User | undefined;

  private userCache$: Observable<any> | undefined;

  constructor(private http: HttpClient) { }

  login(loginParol: any): Observable<any> {
    return this.http.post(this.api + "/auth", loginParol)
    .pipe(
      map((data:any)=>{
        if(data && data.token){
            localStorage.setItem('token', data.token);
        }
        return data;
      })
    )
  }

  register(user: any): Observable<any> {
    return this.http.post(this.api + "/register", user);
  }
  update(user: any): Observable<any> {
    return this.http.post(this.api + "/update", user);
  }

  identity(){
    if(!this.userCache$) this.userCache$ = this.http.get<User>(this.api+"/current")
    .pipe(
      shareReplay(1),
      map(user=>{
        this.currentUser = user;
        return user;
      })
    );
    return this.userCache$;
  }
  logout() {
    localStorage.removeItem('token');
    this.userCache$ = undefined;
  }
  // hasRole(role: Role[]): boolean  {
  //   console.log(role, this.currentUser);

  //   if(this.currentUser){
  //       return role.includes(this.currentUser.role);
  //   }
  //   return false;

  // }
}