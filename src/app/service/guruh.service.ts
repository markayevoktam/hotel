import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guruh } from '../model/guruh';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class GuruhService {

  api = environment.baseApi + "/api/guruh";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api,/* */ {
      params: params
    });
  }
  getByNom():Observable<any>{
  return this.http.get<any>(this.api+"/nom");
}
  getById(id: number): Observable<any>{
    return this.http.get<any>(this.api + "/" + id);
  }

  create(guruh: any): Observable<any>{
    return this.http.post<any>(this.api, guruh);

  }

  update(guruh: any): Observable<any>{
    return this.http.put<any>(this.api, guruh);

  }
  deleteById(id: number): Observable<any>{
    return this.http.delete<any>(this.api + "/" + id);

  }
}
