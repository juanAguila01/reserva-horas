import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente';

@Injectable()
export class ClienteService {

  
  private headers = new HttpHeaders({"Content-Type" : "application/json"});
  constructor(
    private http: HttpClient
  ) { }

  getCliente(url): Observable<Cliente>{
    return this.http.get<Cliente>(url);
  }
  
  getClientes(url): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(url);
  } 

  addCliente(url:string,cliente:object){
    return this.http.post(url, cliente, {headers : this.headers});
  } 
}
