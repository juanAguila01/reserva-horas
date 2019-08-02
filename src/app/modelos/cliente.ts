export class Cliente {
    id:number;
	nombre: string;
	rut: string;
	telefono: string;
	email: string;
    contrasena: string;
    constructor(nombre:string,rut:string,telefono:string,email:string,contrasena:string,id:number){
        this.id = id;
        this.nombre = nombre;
        this.rut = rut;
        this.telefono = telefono;
        this.email = email;
        this.contrasena = contrasena;
    }
}
