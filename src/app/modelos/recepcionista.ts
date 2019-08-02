export class Recepcionista {
    contrasena: string;
    direccion: string;
    horaApertura: string;
    horaCierre: string;
    id: number;
    nombre: string;
    constructor(
        contrasena: string,
        direccion: string,
        horaApertura: string,
        horaCierre: string,
        id: number,
        nombre: string
    ){
        this.contrasena = contrasena;
        this.direccion = direccion;
        this.horaApertura = horaApertura;
        this.horaCierre = horaCierre;
        this.id = id;
        this.nombre = nombre;
    }
}
