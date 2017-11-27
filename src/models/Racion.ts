export class Racion {
    nombre: string;
    precio: number;
    
    constructor(racion: any) {
        this.nombre = racion.nombre;
        this.precio = racion.precio;
    }
}