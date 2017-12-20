export class Racion {
    nombre: string;
    otro: string;
    medida: number;
    precio: number;
    unidad: string;
    
    constructor(racion: any) {
        this.nombre = racion.nombre;
        this.otro = racion.otro || null;
        this.medida = racion.medida || null;
        this.precio = racion.precio;
        this.unidad = racion.unidad || null;
    }
}