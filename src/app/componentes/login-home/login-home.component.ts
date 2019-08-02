import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';
import { Recepcionista } from '../../modelos/recepcionista';
import { Administrador } from '../../modelos/administrador';
import { AdministradorService } from '../../servicios/administrador.service';
import { RecepcionistaService } from '../../servicios/recepcionista.service';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

  clientes : Cliente[];
  recepcionistas : Recepcionista[];
  admins : Administrador[];
  clienteObj : object = {};
  contrasena2:string = "";
  camposRequeridos:boolean = false;
  rutInvalido:boolean = false;
  telefonoInvalido:boolean = false;
  emailInvalido:boolean = false;
  contrasenaDiferente:boolean = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private clienteService: ClienteService,
    private adminService: AdministradorService,
    private recepcionistaService: RecepcionistaService
    ) { }  

  ngOnInit() {
  }
  validarCliente(clienteIngresado){
    // console.log(clienteIngresado);   
    let url = "http://localhost:8080/api/clientes";
    this.clienteService.getClientes(url).subscribe(
      (res :Cliente[]) => {
        this.clientes = res;  
        for (let i = 0; i < this.clientes.length; i++) {  
           
          if((clienteIngresado.contrasenaCliente === this.clientes[i].contrasena) && (clienteIngresado.email === this.clientes[i].email)){
            console.log(clienteIngresado,this.clientes[i]);
            this.grabarLocalStorage(this.clientes[i].id + "");
            this.cerrarModal('modalIngresar');  

            this.router.navigate(["homeCliente"],{relativeTo:this.route});break;   

          }else if(i == this.clientes.length-1){
              Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Contraseña o Email Incorrectos!'
              }) 
          } 

        }

      },
      (error)=>{console.log('fallo al obtener clientes')}
    )
  }
  validarRecep(recepcionistaIngresado){
    let url = "http://localhost:8080/api/recepcionistas";
    this.recepcionistaService.getrecepcionistas(url).subscribe(
      (res :Recepcionista[]) => {
        this.recepcionistas = res; 
        for (let i = 0; i < this.recepcionistas.length; i++) {  
          
          if((recepcionistaIngresado.contrasenaRecep === this.recepcionistas[i].contrasena) && (recepcionistaIngresado.nombre === this.recepcionistas[i].nombre)){
            console.log(recepcionistaIngresado,this.recepcionistas[i]); 
            this.grabarLocalStorage(this.recepcionistas[i].id + "");
            this.cerrarModal('recepcionistaLogin');   

            this.router.navigate(["homeRecepcionista"],{relativeTo:this.route});break;   

          }else if(i == this.recepcionistas.length-1){
              Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Contraseña o Email Incorrectos!'
              })  
          } 

        }

      },
      (error)=>{console.log('fallo al obtener recepcionistas.')}
    )
  }  
  validarAdmin(adminIngresado){
    let url = "http://localhost:8080/api/admins";
    this.adminService.getAdmins(url).subscribe(
      (res :Administrador[]) => {
        this.admins = res; 
        for (let i = 0; i < this.admins.length; i++) {  
          
          if((adminIngresado.contrasenaAdmin === this.admins[i].contrasena) && (adminIngresado.nombre === this.admins[i].nombre)){
            console.log(adminIngresado,this.admins[i]); 
            this.grabarLocalStorage(this.admins[i].id + "");
            this.cerrarModal('adminLogin');   

            this.router.navigate(["homeAdmin"],{relativeTo:this.route});break;   
  
          }else if(i == this.admins.length-1){
              Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Contraseña o Email Incorrectos!'
              }) 
          } 

        }

      },
      (error)=>{console.log('fallo al obtener administradores.')}
    )
  }

  
  grabarLocalStorage(id:string){  
    localStorage.setItem("id",id);  
  } 

  mostrarModal(idModal:string){  
    let modalInicio = document.getElementById(idModal);
    modalInicio.style.display="block"; 
    modalInicio.style.transitionDuration='1s';  
  } 
  cerrarModal(idModal:string){
    let modalInicio = document.getElementById(idModal);
    modalInicio.style.display="none";  
    modalInicio.style.transitionDuration='1s';
  }
 

  agregarCliente(cliente : any){
    this.clienteObj = {
      "nombre" : cliente.nombre,
      "rut" : cliente.rut,   
      "telefono" : cliente.telefono, 
      "email" : cliente.email,
      "contrasena" : cliente.contrasena 
    }
    let url = "http://localhost:8080/api/clientes";
    if(this.validarRegistroCliente(cliente)){
      this.clienteService.addCliente(url, this.clienteObj).subscribe(
        (res : Response) =>{
            Swal.fire('Nuevo Cliente', `${cliente.nombre} creado con exito` ,'success'); 
        },   
        (error)=>{
          switch (error.status) {
            case 406: Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'El rut ya existe.'
            }); break;
            case 409: Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'El correo ya existe.'
            }); break;
          }
        console.log(error.status)}  
      ) 
    }
 
      
  }

  validarRegistroCliente(cliente):boolean{
    let retorno = true;

    if(((cliente.telefono === "")||(cliente.nombre === "")||(cliente.rut === "")||
    (cliente.email === "")||(cliente.contrasena === "")||(this.contrasena2 === ""))||
    ((cliente.telefono == undefined)||(cliente.nombre == undefined)||(cliente.rut == undefined)||
    (cliente.email == undefined)||(cliente.contrasena == undefined)||(this.contrasena2 == undefined))){
      this.camposRequeridos = true; 
      setTimeout(()=>{
        this.camposRequeridos = false;
      },1500);
      retorno =  false;
    }

    if((cliente.contrasena !== this.contrasena2)|| cliente.contrasena === "" || cliente.contrasena == undefined || this.contrasena2 === ""){
      this.contrasenaDiferente = true;
      retorno = false;
    }else{
      this.contrasenaDiferente = false;
    }

    // VERIFICADOR DE RUT  si la funcion da true significa que el rut es valido por lo tanto trabajamos con la funcion negada
    if(!this.verificaRut(cliente.rut)){
      //si el rut no es valido rutInvalido = true;
      this.rutInvalido = true;
      retorno =  false; 
    }else{
      this.rutInvalido = false;
    }

    //si la funcion retorna true significa que el telefono es valido por lo tanto utilizamos el negativo.
    if(!this.verificaFormatoTelefono(cliente.telefono)){
      this.telefonoInvalido = true;
      retorno = false;
    }else{
      this.telefonoInvalido = false;
    }

    //si la funcion retorna true significa que el email es valido por lo tanto utilizamos el negativo.
    if(!this.verificaFormatoEmail(cliente.email)){
      this.emailInvalido = true;
      retorno = false;
    }else{
      this.emailInvalido = false;
    }

    console.log(cliente)

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

  verificaFormatoEmail(email:string): boolean{
    let retorno = true;
    let expresionRegular = /\w+@\w+\.com/;
    console.log(email);
    // console.log(expresionRegular.test("+569 45455719"));
    if(expresionRegular.test(email)){
      retorno = true;
    }else{
      retorno = false;
    }
    return retorno;
  }

}
