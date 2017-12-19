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
    raciones: Racion[];
    fotos: string[];
    esCerveza: boolean;
    graduacion: number;
    ibu: number;
    proveedor: string;
    stock: boolean;
    tipo: string;

    constructor(item: any) {
      this.id = item.id
      this.idCategoria = item.idCategoria;
      this.descripcion = item.descripcion || null;
      this.nombre = item.nombre || null;
      if (item.raciones) {
        this.raciones = item.raciones
      } else {
        this.raciones = null;
      }
      this.fotos = item.fotos || null;
      this.esCerveza = item.esCerveza || null;
      this.graduacion = item.graduacion || null;
      this.ibu = item.ibu || null;
      this.proveedor = item.proveedor || null;
      this.stock = item.stock || null;
      this.tipo = item.tipo || null;
    }
}
