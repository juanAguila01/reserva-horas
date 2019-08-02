import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  tipoIngreso : number;
  cliente : boolean = false;
  admin : boolean = false;
  recepcionista : boolean = false;
  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    
  }

  mostrar(tipoIngreso : number){
    this.tipoIngreso = tipoIngreso;

    if (this.tipoIngreso == 1) {
      this.cliente = true;
      this.admin = false;
      this.recepcionista = false;
    }
    if(this.tipoIngreso == 2) {
      this.cliente = false;
      this.admin = true;
      this.recepcionista = false;
    }
    if(this.tipoIngreso == 3){
      this.cliente = false;
      this.admin = false;
      this.recepcionista = true;
    }

    console.log(this.tipoIngreso);
  }

}
