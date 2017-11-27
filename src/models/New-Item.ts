import { Categoria } from "./Categoria";

export class NewItem {
    descripcion: string;
    nombre: string;
    precio: number;
    foto: string;
    graduacion: number;
    ibu: number;
    proveedor: string;
    idCategoria: string;

	constructor(item: any) {
       this.descripcion = item.descripcion ;
       this.nombre = item.nombre ;
       this.idCategoria = item.idCategoria;
       this.precio = item.precio ;
       this.foto = item.foto;
       this.graduacion = item.graduacion ;
       this.ibu = item.ibu ;
       this.proveedor = item.proveedor;
       this.foto = item.foto || null;
  	}
}