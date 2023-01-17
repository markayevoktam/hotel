import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Fakultet } from '../model/fakultet';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class FakultetService {
  api = environment.baseApi + "/api/fakultet";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api, {
      params: params
    });
  }

  getById(id: number): Observable<any>{
    return this.http.get<any>(this.api + "/" + id);
  }

  create(fakultet: any): Observable<any>{
    return this.http.post<any>(this.api, fakultet);

  }

  update(fakultet: any): Observable<any>{
    return this.http.put<any>(this.api, fakultet);

  }
  deleteById(id: number): Observable<any>{
    return this.http.delete<any>(this.api + "/" + id);

  }



 
  
  
}
