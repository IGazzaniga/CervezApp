import { Item } from "./Item";

export class Categoria {
    id: string;
    nombre: string;
	imagen: string;
    idNegocio: string;
	items: Item[];
	icono: string;

	constructor(categoria: any) {
		this.id = categoria.id;
		this.nombre = categoria.nombre;
		this.imagen = categoria.imagen;
		this.idNegocio = categoria.idNegocio;
		this.items = categoria.items || [];
		this.icono = categoria.icono || null;
  	}
}


