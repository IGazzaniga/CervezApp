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
      this.descripcion = item.descripcion || null;
      this.nombre = item.nombre || null;
      this.precio = item.precio || null;
      if (item.racion) {
        this.racion = new Racion(item.racion);
      } else {
        this.racion = null;
      }
      this.foto = item.foto || null;
      this.graduacion = item.graduacion || null;
      this.ibu = item.ibu || null;
      this.proveedor = item.proveedor || null;
    }
}
