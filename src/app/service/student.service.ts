import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  api = environment.baseApi + "/api/student";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api, {
      params: params
    });
  }
  

  getById(id: number): Observable<any>{
    return this.http.get<any>(this.api + "/" + id);
  }

  create(student: any): Observable<any>{
    return this.http.post<any>(this.api, student);

  }

  update(student: any): Observable<any>{
    return this.http.put<any>(this.api, student);

  }
  deleteById(id: number): Observable<any>{
    return this.http.delete<any>(this.api + "/" + id);

  }
}
