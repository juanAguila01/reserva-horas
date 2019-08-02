import { Component, OnInit } from '@angular/core';

@Component({ 
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  color:string = "red";
  numeroPorcentaje:string;  
  constructor() { }

  ngOnInit() {

  }
 
  
  porcentajeDinamico(){
    let elemento = document.getElementById("porcentajeHtml");
    console.log(typeof this.numeroPorcentaje);
    console.log(this.numeroPorcentaje); 
    let gradosCalculados = 180 * (parseInt(this.numeroPorcentaje) / 100); 

    let gradosFinal = gradosCalculados + "deg";    

    elemento.style.setProperty("--grados",gradosFinal);  
    elemento.style.setProperty("--gradosMenos","-"+gradosFinal); 
  } 

}
 