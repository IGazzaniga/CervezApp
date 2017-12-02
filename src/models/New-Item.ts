import { Categoria } from "./Categoria";

export class NewItem {
    descripcion: string;
    nombre: string;
    fotos: string[];
    graduacion: number;
    ibu: number;
    proveedor: string;
    idCategoria: string;
    stock: boolean;
    tipo: string;

	constructor(newitem: any) {
       this.descripcion = newitem.descripcion ;
       this.nombre = newitem.nombre ;
       this.idCategoria = newitem.idCategoria;
       this.graduacion = newitem.graduacion ;
       this.ibu = newitem.ibu ;
       this.proveedor = newitem.proveedor;
       this.fotos = newitem.fotos || null;
       this.stock = newitem.stock || null;
       this.tipo = newitem.tipo || null;
  	}
}