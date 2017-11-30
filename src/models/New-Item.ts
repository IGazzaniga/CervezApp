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

	constructor(newitem: any) {
       this.descripcion = newitem.descripcion ;
       this.nombre = newitem.nombre ;
       this.idCategoria = newitem.idCategoria;
       this.precio = newitem.precio ;
       this.graduacion = newitem.graduacion ;
       this.ibu = newitem.ibu ;
       this.proveedor = newitem.proveedor;
       this.foto = newitem.foto || null;
  	}
}