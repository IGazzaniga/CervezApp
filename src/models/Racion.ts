export class Racion {
    nombre: string;
    medida: string;
    precio: number;
    unidad: string;
    
    constructor(racion: any) {
        this.nombre = racion.nombre;
        this.medida = racion.medida || null;
        this.precio = racion.precio;
        this.unidad = racion.unidad || null;
    }
}