export class Racion {
    nombre: string;
    medida: string;
    precio: number;
    unidad: string;
    foto: string;
    
    constructor(racion: any) {
        this.nombre = racion.nombre;
        this.medida = racion.medida || null;
        this.precio = racion.precio;
        this.unidad = racion.unidad || null;
        this.foto = racion.foto || null;
    }
}