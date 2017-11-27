import { Item } from "./Item";

export class Categoria {
    id: string;
    nombre: string;
	imagen: string;
    idNegocio: string;
    items: Item[];

	constructor(categoria: any) {
		this.id = categoria.id;
		this.nombre = categoria.nombre;
		this.imagen = categoria.imagen;
		this.idNegocio = categoria.idNegocio;
		this.items = categoria.items || [];
  	}
}