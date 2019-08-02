import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../modelos/reserva';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReservaService {

  private headers = new HttpHeaders({"Content-Type" : "application/json"});
  constructor(private http: HttpClient) { }

  getReservas(url): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(url);
  }

  addReserva(url:string,reserva:object){
    return this.http.post(url,reserva,{headers: this.headers});   
  }

  updateReserva(url:string,reserva:object){
    return this.http.put(url,JSON.stringify(reserva), {headers : this.headers});
  }

}
