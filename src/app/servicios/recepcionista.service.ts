import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recepcionista } from '../modelos/recepcionista';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RecepcionistaService {

  
  private headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(
    private http: HttpClient
  ) { }

  getrecepcionistas(url): Observable<Recepcionista[]>{
    return this.http.get<Recepcionista[]>(url);
  }

  addRecepcionista(url:string,recepcionista:object){
    return this.http.post(url, recepcionista, {headers : this.headers});
  }

  updateRecepcionista(url:string,recepcionista:object){
    return this.http.put(url,JSON.stringify(recepcionista), {headers : this.headers});
  }

  deleteRecepcionista(url){
    return this.http.delete(url, {headers : this.headers});
  }
}
