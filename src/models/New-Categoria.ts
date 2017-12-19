export class NewCategoria {
    
    nombre: string;
    imagen: string;
    icono: string;

	constructor(categoria: any) {
        this.nombre = categoria.nombre;
        this.imagen = categoria.imagen || null;
        this.icono = categoria.icono || null;
  	}
}

