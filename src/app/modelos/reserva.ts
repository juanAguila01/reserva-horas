import { Cliente } from "./cliente";
import { Recepcionista } from "./recepcionista";

export class Reserva { 
    cliente: Cliente;
    direccion: string;
    estado: string;
    fecha: string;
    hora: string;
    id: number;
    nombre: string;
    recepcionista: Recepcionista;
    rut: string;
    telefono: string;
    constructor(cliente: Cliente,direccion: string,estado: string,fecha: string,hora: string,id: number,nombre: string,recepcionista: Recepcionista,rut: string,telefono: string){
        this.cliente = cliente;
        this.direccion = direccion;
        this.estado = estado;
        this.fecha = fecha;
        this.hora = hora;
        this.id = id;
        this.nombre = nombre;
        this.recepcionista = recepcionista;
        this.rut = rut;
        this.telefono = telefono;
    }
}
