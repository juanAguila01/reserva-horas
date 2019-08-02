export class Administrador {
    contrasena: string;
    id: number;
    nombre: string;
    constructor(contrasena: string,id:number,nombre:string){
        this.contrasena = contrasena;
        this.id = id;
        this.nombre = nombre;
    } 
}
