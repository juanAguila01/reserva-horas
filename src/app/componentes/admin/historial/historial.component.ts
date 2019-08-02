import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../../modelos/reserva';
import { Administrador } from '../../../modelos/administrador';
import { Recepcionista } from '../../../modelos/recepcionista';
import { AdministradorService } from '../../../servicios/administrador.service';
import { ReservaService } from '../../../servicios/reserva.service';
import { RecepcionistaService } from '../../../servicios/recepcionista.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  p:number = 1;
  todasReservas : Reserva[];
  reservas: Reserva[];
  admins : Administrador[];
  admin : Administrador;
  recepcionistas : Recepcionista[];
  constructor(
    private adminService : AdministradorService,
    private reservaService: ReservaService,
    private recepcionistaService: RecepcionistaService
    ) {  }

  ngOnInit() { 
    let urlAdmins : string = "http://localhost:8080/api/admins";
    this.adminService.getAdmins(urlAdmins).subscribe(
      (res :Administrador[]) => {
        this.admins = res; 
        this.admin = this.admins[0];
        console.log(this.admin);  
      },
      (error)=>{console.log('fallo al obtener admins.')}  
    )

    this.getReservasAdmin(); 
    this.getRecepcionistas(); 
  }

  getRecepcionistas(){
    let url = "http://localhost:8080/api/recepcionistas";
    this.recepcionistaService.getrecepcionistas(url).subscribe(
      (res :Recepcionista[]) => {
        this.recepcionistas = res;  
      },
      (error)=>{console.log('fallo al obtener recepcionistas.')}
    )
  }

  getReservasAdmin(){
    let url = "http://localhost:8080/api/reservas";
    this.reservaService.getReservas(url).subscribe(
      (res :Reserva[]) => {
        this.todasReservas = res;
        this.reservas = this.todasReservas;
      },
      (error)=>{console.log('fallo al obtener reservas')}
    ) 
  }

  ordenarEstado(estado:string){
    let url = "http://localhost:8080/api/reservas/estado/" + estado;
    return this.reservaService.getReservas(url).subscribe(
      (res :Reserva[]) => {
        this.reservas = res;
      },
      (error)=>{console.log('fallo al obtener reservas por estado.')}
    )    
  } 
  ordenarSucursal(direccion:string){ 
    let url = "http://localhost:8080/api/reservas/direccion/" + direccion;
    return this.reservaService.getReservas(url).subscribe(
      (res :Reserva[]) => {
        this.reservas = res; 
      },
      (error)=>{console.log('fallo al obtener reservas por direccion.')} 
    )   
  }

  ordenarFecha(fecha:string){

  }
  //creo que si es para ordenar tiene sentido pero para encontrar no
  ordenarRut(rut:string){
    let url = "http://localhost:8080/api/reservas/rut/" + rut;
    return this.reservaService.getReservas(url).subscribe(
      (res :Reserva[]) => {
        this.reservas = res;
      },
      (error)=>{console.log('fallo al obtener reservas por rut.')}
    )
  }

  downloadPdf(){
    let pdf = new jsPDF({
      orientation: 'l',
      unit: 'pt',
      format: 'carta'
     });
    pdf.setFontSize(22); 
    pdf.text("Reporte de Reservas Totales",30,30);
    pdf.fromHTML($('#tablaPdf').get(0),30,30,{
      "width":600
    });
    pdf.save("reporte.pdf");
  }

}
