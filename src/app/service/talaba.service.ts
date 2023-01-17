import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class TalabaService {

  api = environment.baseApi + "/api/talaba";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api, {
      params: params
    });
  }
  
  getAllTalented(params: any): Observable<Page> {
    return this.http.get<Page>(this.api+"/talented", {
      params: params
    });
  }

  getById(id: number): Observable<any>{
    return this.http.get<any>(this.api + "/" + id);
  }

  create(talaba: any): Observable<any>{
    return this.http.post<any>(this.api, talaba);

  }

  update(talaba: any): Observable<any>{
    return this.http.put<any>(this.api, talaba);

  }
  deleteById(id: number): Observable<any>{
    return this.http.delete<any>(this.api + "/" + id);

  }
}
