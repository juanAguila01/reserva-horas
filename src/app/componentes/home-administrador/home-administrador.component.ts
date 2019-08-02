import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css']
})
export class HomeAdministradorComponent implements OnInit {

  constructor(public router:Router, public route: ActivatedRoute) { }

  ngOnInit() { 
    this.router.navigate(["listaRecepcionistas"],{relativeTo:this.route});
  }

  listaRecepcionistas(){
    this.router.navigate(["listaRecepcionistas"],{relativeTo: this.route});
  }

  adiminReservas(){
    this.router.navigate(["historialGlobal"],{relativeTo: this.route});
  } 

  home(){
    this.router.navigate([""]);   
  }
}
