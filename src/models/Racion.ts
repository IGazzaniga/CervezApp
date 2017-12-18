export class Racion {
    nombre: string;
    medida: number;
    precio: number;
    unidad: string;
    
    constructor(racion: any) {
        this.nombre = racion.nombre;
        this.medida = racion.medida || null;
        this.precio = racion.precio;
        this.unidad = racion.unidad || null;
    }
}