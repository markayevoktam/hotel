import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class PublicService {


  api = environment.baseApi + "/api/public";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api + "/talaba", {
      params: params
    });
  }

  getById(id: number): Observable<any>{
    return this.http.get<any>(this.api + "/talaba/" + id);
  }

  

}
