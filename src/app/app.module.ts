import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
 
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { PieDePaginaComponent } from './componentes/pie-de-pagina/pie-de-pagina.component';
import { HistorialComponent } from './componentes/admin/historial/historial.component';
import { ListaRecepcionComponent } from './componentes/admin/lista-recepcion/lista-recepcion.component';
import { HistorialSucursalComponent } from './componentes/recepcionista/historial-sucursal/historial-sucursal.component';
import { ClienteMisReservasComponent } from './componentes/cliente/cliente-mis-reservas/cliente-mis-reservas.component';
import { EditarReservaComponent } from './componentes/recepcionista/editar-reserva/editar-reserva.component';
import { EditarRecepcionistaComponent } from './componentes/admin/editar-recepcionista/editar-recepcionista.component';
import { LoginHomeComponent } from './componentes/login-home/login-home.component';
import { HomeClienteComponent } from './componentes/home-cliente/home-cliente.component';
import { HomeRecepcionistaComponent } from './componentes/home-recepcionista/home-recepcionista.component';
import { HomeAdministradorComponent } from './componentes/home-administrador/home-administrador.component';
//servicios
import { AdministradorService } from './servicios/administrador.service';
import { ClienteService } from './servicios/cliente.service';
import { RecepcionistaService } from './servicios/recepcionista.service';
import { ReservaService } from './servicios/reserva.service';
import { ValidacionReservasService } from './servicios/validacion-reservas.service';

const routes: Routes = [ 
  {path : "editarRecepcionista/:id", component : EditarRecepcionistaComponent},
  {path : "editarReserva/:id", component : EditarReservaComponent}, 
  {path: "loginHome", component: LoginHomeComponent}, 
  {
    path : "homeCliente",
    component: HomeClienteComponent,
    children :[
      {path : "clienteMisReservas", component : ClienteMisReservasComponent}
    ]
  }, 
  {
    path : "homeRecepcionista",
    component: HomeRecepcionistaComponent,
    children :[
      {path : "historialSucursal", component : HistorialSucursalComponent}
    ] 
  }, 
  {
    path : "homeAdmin",
    component: HomeAdministradorComponent,
    children :[
      {path : "historialGlobal", component : HistorialComponent},
      {path : "listaRecepcionistas", component : ListaRecepcionComponent} 
    ]
  },
  {path : "**", component : LoginHomeComponent}  
];

@NgModule({
  declarations: [
    AppComponent,
    PieDePaginaComponent,
    HistorialComponent,
    ListaRecepcionComponent,
    HistorialSucursalComponent,
    ClienteMisReservasComponent,
    EditarReservaComponent,
    EditarRecepcionistaComponent,
    LoginHomeComponent,
    HomeClienteComponent,
    HomeRecepcionistaComponent,
    HomeAdministradorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [AdministradorService,ClienteService,RecepcionistaService,ReservaService,ValidacionReservasService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
  