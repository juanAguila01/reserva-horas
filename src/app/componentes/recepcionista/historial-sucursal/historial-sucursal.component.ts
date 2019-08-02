import { Component, OnInit } from '@angular/core';
import { Recepcionista } from '../../../modelos/recepcionista';
import { Reserva } from '../../../modelos/reserva';
import { ReservaService } from '../../../servicios/reserva.service';
import { RecepcionistaService } from '../../../servicios/recepcionista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-sucursal',
  templateUrl: './historial-sucursal.component.html',
  styleUrls: ['./historial-sucursal.component.css'] 
})
export class HistorialSucursalComponent implements OnInit {

  p:number = 1; 
  todasReservas: Reserva[];
  reservas:Reserva[]; 
  reservaObj : object = {};
  recepcionista : Recepcionista;
  recepcionistas : Recepcionista[];
  id:string; 
  tipoOrden:string; 
  //validacion de mensajes.
  camposRequeridos:boolean = false;
  rutInvalido:boolean = false;
  telefonoInvalido:boolean = false;
  
  constructor(
    private reservaService : ReservaService,
    private recepcionistaService : RecepcionistaService
    ) { }

  ngOnInit() {
    this.getLocalStorage();
    let url = "http://localhost:8080/api/recepcionistas";
    this.recepcionistaService.getrecepcionistas(url).subscribe(
      (res :Recepcionista[]) => {
        this.recepcionistas = res;
        for (let i = 0; i <  this.recepcionistas.length; i++) {
          if(this.recepcionistas[i].id == parseInt(this.id)){
            // console.log(this.recepcionistas[i]); 
            this.recepcionista = this.recepcionistas[i];
            console.log(this.recepcionista);
            this.getReservasRecepcion(this.recepcionista);
          }  
        }
      },
      (error)=>{console.log('fallo al obtener recepcionistas.')}   
    )
    // this.getReservasRecepcion();
  }
 
  getLocalStorage(){
    this.id = localStorage.getItem("id");
    // console.log(this.id);  
  } 

  getReservasRecepcion(recepcionista){
    let url = "http://localhost:8080/api/reservas/direccion/" + recepcionista.direccion;
    return this.reservaService.getReservas(url).subscribe(
      (res :Reserva[]) => {
        this.todasReservas = res;
        this.reservas = this.todasReservas; 
      },
      (error)=>{console.log('fallo al obtener reseravas por direccion')}
    )  
  }

  mostrarTodas(){
    this.reservas = this.todasReservas; 
  }

  getReservasRecepcionEstado(reservas,estado){
    let reservaAux : Reserva[] = [];  
    for (let i = 0 , j = 0; i < reservas.length; i++) {
      console.log(reservas[i].estado);  
      if(reservas[i].estado === estado){
        reservaAux[j] = reservas[i];
        j++;
      }
    } 
    this.reservas = reservaAux;
  }

  agregarReservaRecepcion(reserva){
    
    this.reservaObj = {
      "nombre" : reserva.nombre,
      "rut" : reserva.rut,
      "telefono" : reserva.telefono,
      "direccion" : reserva.direccion,
      "fecha" : reserva.fecha,
      "hora" : reserva.hora,
      "estado" : "espera"
    }
    let url = "http://localhost:8080/api/reservas";
    if(this.validacionReserva(reserva)){
      this.reservaService.addReserva(url,this.reservaObj).subscribe(
        (res) =>{   
          console.log(res);
          Swal.fire("Reservado","Se a reservado con exito, miralo en tus reservas","success"); 
          this.getReservasRecepcion(reserva);
        },
        (error)=>{
          switch (error.status) {
            case 415: Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'No se puede seleccionar una fecha anterior.'
            }); break;
            case 426: Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'No se puede seleccionar una hora anterior.'
            }); break;
            case 414: Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'No se puede seleccionar esa hora.'
            }); break;
          }
        }
      ) 
    }
  }

  ordenar(estado){ 
    let url = "http://localhost:8080/api/recepcionistas";
     
    this.getReservasRecepcionEstado(this.todasReservas, estado);
    // this.recepcionistaService.getrecepcionistas(url).subscribe(
    //   (res :Recepcionista[]) => {
    //     this.recepcionistas = res;
    //     for (let i = 0; i <  this.recepcionistas.length; i++) {
    //       if(this.recepcionistas[i].id == parseInt(this.id)){
    //         console.log(this.recepcionistas[i]); 
    //         this.recepcionista = this.recepcionistas[i];
    //         this.getReservasRecepcionEstado(this.todasReservas, estado);
    //         console.log(this.reservas);

    //       }  
    //     }
    //   } 
    // )
  }

  //retorna un booleano true si los datos estan ok y false si los datos estan mal,
  //en caso de que esten mal a demas de false realiza una accion pone a true una variable 
  //dicha variable permite ver una alerta en pantalla.
  validacionReserva(datosReserva): boolean{
    let retorno = true;
   /*CON ESTO ME ASEGURO DE QUE NI UN CAMPO ESTE VACIO*/      
    if(((datosReserva.direccion === "")||(datosReserva.fecha === "")||(datosReserva.hora === "")||
      (datosReserva.nombre === "")||(datosReserva.rut === "")||(datosReserva.telefono === ""))|| 
      ((datosReserva.direccion === undefined)||(datosReserva.fecha === undefined)||(datosReserva.hora === undefined)||
      (datosReserva.nombre === undefined)||(datosReserva.rut === undefined)||(datosReserva.telefono === undefined))){

        this.camposRequeridos = true; 
        setTimeout(()=>{
          this.camposRequeridos = false;
        },1500); 
        console.log("rellenar campos obligatorios")
        retorno =  false;
    }

    // VERIFICADOR DE RUT  si la funcion da true significa que el rut es valido por lo tanto trabajamos con la funcion negada
    if(!this.verificaRut(datosReserva.rut)){
      //si el rut no es valido rutInvalido = true;
      this.rutInvalido = true;
      retorno =  false; 
    }else{
      this.rutInvalido = false;
    }

    //si la funcion retorna true significa que el telefono es valido por lo tanto utilizamos el negativo.
    if(!this.verificaFormatoTelefono(datosReserva.telefono)){
      this.telefonoInvalido = true;
      retorno = false;
    }else{
      this.telefonoInvalido = false;
    }

    console.log(datosReserva); 
    return retorno; 
  }  

  verificaRut(rut:string):boolean{
    let expresionRegular = /\d{7,8}[0-9k]/;
    let multiplicador : number = 2;
    let sumaMultiplos : number = 0;
    const DIVISOR:number = 11;
    let rutSinVerificador :string = rut;
    let verificadorDado:string = rut;
    let verificadorBrutoObtenido : number;
    let verificadorObtenido : string;
    rutSinVerificador = rutSinVerificador.slice(0,rutSinVerificador.length - 1); 
    verificadorDado = verificadorDado.slice(verificadorDado.length-1); 
    console.log(rutSinVerificador);
    console.log(verificadorDado); 
    for (let i = rutSinVerificador.length - 1; i >= 0; i--) {
       if(multiplicador != 7){
        sumaMultiplos += parseInt(rutSinVerificador.slice(i,i+1)) * multiplicador;
        multiplicador += 1;
       }else{
        sumaMultiplos += parseInt(rutSinVerificador.slice(i,i+1)) * multiplicador;
        multiplicador = 2;
       }  
    }
    console.log(sumaMultiplos);
    verificadorBrutoObtenido = DIVISOR - (sumaMultiplos % DIVISOR);
    console.log(verificadorBrutoObtenido);
    switch (verificadorBrutoObtenido) {
      case 11: verificadorObtenido = "0"; break;
      case 10: verificadorObtenido = "k"; break;
      default: verificadorObtenido = verificadorBrutoObtenido + ""; break; 
    }

    if(expresionRegular.test(rut)){
      if(verificadorObtenido === verificadorDado){
        console.log("rut valido");
        return true;
      }else{
        console.log("rut invalido");
        return false;
      } 
    }else{
      return false;
    }
  }
  verificaFormatoTelefono(telefono:string): boolean{
    let retorno = true;
    let expresionRegular = /\+\d{2,3} \d{8}/;
    console.log(telefono);
    // console.log(expresionRegular.test("+569 45455719"));
    if(expresionRegular.test(telefono)){
      retorno = true;
    }else{
      retorno = false;
    }
    return retorno;
  }
  
}