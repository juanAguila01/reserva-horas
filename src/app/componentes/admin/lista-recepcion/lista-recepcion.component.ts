import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Recepcionista } from '../../../modelos/recepcionista';
import { RecepcionistaService } from '../../../servicios/recepcionista.service';

@Component({
  selector: 'app-lista-recepcion',
  templateUrl: './lista-recepcion.component.html', 
  styleUrls: ['./lista-recepcion.component.css']
})
export class ListaRecepcionComponent implements OnInit {

  resepcionistas:Recepcionista[]; 
  recepcionistaObj : object = {};
  camposRequeridos:boolean = false;
  constructor(
    private recepcionistaService: RecepcionistaService
    ) { } 

  ngOnInit() {
    this.getRecepcionistas();  
  }

  getRecepcionistas(){
    let url = "http://localhost:8080/api/recepcionistas";
    this.recepcionistaService.getrecepcionistas(url).subscribe(
      (res :Recepcionista[]) => {
        this.resepcionistas = res;
        console.log(this.resepcionistas);
      },
      (error)=>{console.log('fallo en obtener recepcionistas.')}
    ) 
  }

  /**FUNCIONA MAL HAY QUE ARREGLARLO */
  agregarRecepcionista(recepcionista){
    this.recepcionistaObj = {
      "nombre" : recepcionista.usuario,
      "direccion" : recepcionista.sucursal, 
      "contrasena" : recepcionista.contrasena, 
      "horaApertura" : recepcionista.apertura,
      "horaCierre" : recepcionista.cierre
    }
    let url = "http://localhost:8080/api/recepcionistas";
    if(this.validarFormRegistro(recepcionista)){
      this.recepcionistaService.addRecepcionista(url, this.recepcionistaObj).subscribe(
        (res : Response) =>{
          console.log(res); 
          this.getRecepcionistas(); 
          Swal.fire('Nuevo Recepcionista',"Se a registrado un nuevo Recepcionista",'success');   
        },
        (error)=>{
          switch (error.status) {
            case 400: Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'El nombre ya existe.'
            }); break;
            case 403: Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'La direccion ya existe.'
            }); break;
          }
        }
      )
    }
  }

  validarFormRegistro(recepcionista):boolean{
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

  borrarRecepcionista(id){
    

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Se borrara permanentemente.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        const url = `${"http://localhost:8080/api/recepcionistas"}/${id}`;
        this.recepcionistaService.deleteRecepcionista(url).toPromise()
        .then(
          () => { 
            Swal.fire(
              'Borrado!',
              'El recepcionista fue borrado',
              'success'
            )
            this.getRecepcionistas();
          },
          (error)=>{console.log('fallo en borrar recepcionista.')}
        )
        }
    })
  }
  
  


  

}
