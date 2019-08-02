import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recepcionista } from '../../../modelos/recepcionista';
import { RecepcionistaService } from '../../../servicios/recepcionista.service';

@Component({
  selector: 'app-editar-recepcionista',
  templateUrl: './editar-recepcionista.component.html',
  styleUrls: ['./editar-recepcionista.component.css']
})
export class EditarRecepcionistaComponent implements OnInit {

  id : number;
  recepcionistas : Recepcionista[];
  recepcionistasObj : object = {};
  data : Recepcionista;
  camposRequeridos:boolean = false;

  constructor(
    private route : ActivatedRoute, 
    private router : Router,
    private recepcionistaService : RecepcionistaService
    ) { }
  
  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    },
    (error)=>{console.log('fallo al obtener el id.')}); 
    let url = "http://localhost:8080/api/recepcionistas";
    this.recepcionistaService.getrecepcionistas(url).subscribe(
      (res :Recepcionista[]) => {
        this.recepcionistas = res;
        for (let i = 0; i < this.recepcionistas.length; i++) {
          if(this.recepcionistas[i].id == this.id){
            this.data = this.recepcionistas[i]; 
          }
        }
      },
      (error)=>{console.log('fallo al obtener recepcionistas para mostrarlos.')} 
    )
  }
 

  editarRecepcionista (recepcionista){
    this.recepcionistasObj = {
      "nombre": recepcionista.usuario,
      "direccion": recepcionista.sucursal,
      "contrasena": recepcionista.contrasena,
      "horaApertura": recepcionista.apertura,
      "horaCierre": recepcionista.cierre
    }
    const url = `${'http://localhost:8080/api/recepcionistas'}/${this.id}`;
    if(this.validarFormEditar(recepcionista)){
      this.recepcionistaService.updateRecepcionista(url,this.recepcionistasObj).toPromise()
    .then( 
      () => {this.router.navigate(['homeAdmin/listaRecepcionistas']);},
      (error)=>{console.log('fallo al obtener un recepcionista')}
    ) 
    }
  }

  validarFormEditar(recepcionista):boolean{
   if(((recepcionista.apertura === "")||(recepcionista.cierre === "")||(recepcionista.contrasena === "")||
    (recepcionista.sucursal === "")||(recepcionista.usuario === ""))||
    ((recepcionista.apertura == undefined)||(recepcionista.cierre == undefined)||(recepcionista.contrasena == undefined)||
    (recepcionista.sucursal == undefined)||(recepcionista.usuario == undefined))){
      this.camposRequeridos = true;
      setTimeout(() => {
        this.camposRequeridos = false;
      }, 1500);
      return false;
    }

    console.log(recepcionista);

    return true;
  }

  restaurar(){
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    },
    (error)=>{console.log('fallo al obtener el id.')}); 
    let url = "http://localhost:8080/api/recepcionistas";
    this.recepcionistaService.getrecepcionistas(url).subscribe(
      (res :Recepcionista[]) => {
        this.recepcionistas = res;
        for (let i = 0; i < this.recepcionistas.length; i++) {
          if(this.recepcionistas[i].id == this.id){
            this.data = this.recepcionistas[i]; 
          }
        }
      },
      (error)=>{console.log('fallo al obtener recepcionistas.')} 
    )
  }
} 
