import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  api = environment.baseApi + "/api/user";

  constructor(private http: HttpClient) { }

  getAll(key: string): Observable<User[]>{
    return this.http.get<User[]>(this.api, {
      params: {
        key: key
      }
    });
  }
  getById(id: number): Observable<User>{
    return this.http.get<User>(this.api + "/" + id);
  }
  create(user: User): Observable<User>{
    return this.http.post<User>(this.api, user);
  }
  update(user: User): Observable<User>{
    return this.http.put<User>(this.api, user);
  }
  deleteById(id: number): Observable<any>{
    return this.http.delete<any>(this.api + "/" + id);
  }
}
