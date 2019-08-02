import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {

  constructor(
    public router: Router,
    public route: ActivatedRoute, 
    ) { }

  ngOnInit() {
    this.router.navigate(["clienteMisReservas"],{relativeTo:this.route});
  }

  clienteReservas(){
    this.router.navigate(["clienteMisReservas"],{relativeTo:this.route});
  }

  home(){
    this.router.navigate([""]);   
  }


}
