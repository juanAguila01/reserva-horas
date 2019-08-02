import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../modelos/administrador';

@Injectable()
export class AdministradorService {

  constructor(private http: HttpClient) { }

  getAdmins(url) :Observable<Administrador[]>{
    return this.http.get<Administrador[]>(url);
  }



}
