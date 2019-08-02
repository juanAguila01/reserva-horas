import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../../../modelos/reserva';
import { ReservaService } from '../../../servicios/reserva.service';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent implements OnInit {

  id: number;
  reservas:Reserva[]; 
  data : Reserva;
  reservaObj : object = {};
  camposRequeridos: boolean = false;
  rutInvalido: boolean = false;
  telefonoInvalido: boolean = false;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private reservaService: ReservaService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    },
    (error)=>{console.log('fallo en obtener el id')});
     let url = "http://localhost:8080/api/reservas";
    this.reservaService.getReservas(url).subscribe(
      (res :Reserva[]) => {  
        this.reservas = res;
        for (let i = 0; i < this.reservas.length; i++) {
          if(this.reservas[i].id == this.id){
            this.data = this.reservas[i];
            console.log(this.data.direccion); 
          }   
        }
      },
      (err) =>{
        console.log('fallo en pedir las reservas');
      }
    )
  }

  editarReserva (reserva){ 
    this.reservaObj = {
      "nombre" : reserva.nombre,
      "rut" : reserva.rut,
      "telefono" : reserva.telefono,
      "direccion" : reserva.direccion,
      "fecha" : reserva.fecha,
      "hora" : reserva.hora,
      "estado" : reserva.estado
    } 
    const url = `${'http://localhost:8080/api/reservas'}/${this.id}`;
    if(this.validacionFromEditar(reserva)){
      this.reservaService.updateReserva(url,this.reservaObj).toPromise()
    .then(   
      () => {this.router.navigate(['homeRecepcionista/historialSucursal']);},
      (error) =>{
        console.log('fallo la actualizacion');
      }
    )
    }
  }
  //retorna un booleano true si los datos estan ok y false si los datos estan mal,
  //en caso de que esten mal a demas de false realiza una accion pone a true una variable 
  //dicha variable permite ver una alerta en pantalla.
  validacionFromEditar(datosReserva): boolean{
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

  restaurar(){
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    },
    (error)=>{console.log('fallo en obtener el id')});
     let url = "http://localhost:8080/api/reservas";
    this.reservaService.getReservas(url).subscribe(
      (res :Reserva[]) => {  
        this.reservas = res;
        for (let i = 0; i < this.reservas.length; i++) {
          if(this.reservas[i].id == this.id){
            this.data = this.reservas[i];
            console.log(this.data.direccion); 
          }   
        }
      },
      (err) =>{
        console.log('fallo en pedir las reservas');
      }
    )
  }
 
}
