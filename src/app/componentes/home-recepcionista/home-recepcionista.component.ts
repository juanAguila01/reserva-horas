import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-recepcionista',
  templateUrl: './home-recepcionista.component.html',
  styleUrls: ['./home-recepcionista.component.css']
})
export class HomeRecepcionistaComponent implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(["historialSucursal"],{relativeTo: this.route});
  } 

  RecepcionistaReservas(){
     this.router.navigate(["historialSucursal"],{relativeTo: this.route});
  }

  home(){
    this.router.navigate([""]);   
  }   

}
