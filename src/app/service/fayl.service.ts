import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaylService {

  api = environment.baseApi + "/api/file";

  constructor(private http: HttpClient) { }

  public uploadFayl(fayl: File):Observable<any>{
    let fd = new FormData();
    fd.append("file",fayl,fayl.name);
    return this.http.post(this.api+"/upload",fd);
  }


  public downloadFile(id: number){
    return this.http.get(this.api+"/download/"+id,{responseType:"blob"});
  }

}
