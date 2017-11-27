import { Racion } from "./Racion";

/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Item {
    id: string;
    idCategoria: string;
    descripcion: string;
    nombre: string;
    precio: number;
    racion: Racion;
    foto: string;
    graduacion: number;
    ibu: number;
    proveedor: string;

    constructor(item: any) {
      this.id = item.id
      this.idCategoria = item.idCategoria;
      this.descripcion = item.descripcion;
      this.nombre = item.nombre;
      this.precio = item.precio;
      this.racion = new Racion(item.racion);
      this.foto = item.foto;
      this.graduacion = item.graduacion;
      this.ibu = item.ibu;
      this.proveedor = item.proveedor;
    }
}
