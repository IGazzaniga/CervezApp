export class NewCategoria {
    
    nombre: string;
    imagen: string;

	constructor(categoria: any) {
        this.nombre = categoria.nombre;
        this.imagen = categoria.imagen || null;
  	}
}