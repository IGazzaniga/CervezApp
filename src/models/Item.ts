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
    private $descripcion: string;
    private $nombre: string;
    private $precio: number;
    private $racion: Racion;
    private $foto: string;
    private $graduacion: number;
    private $ibu: number;
    private $proveedor: string;

    constructor($descripcion: string, $nombre: string, $precio: number, $racion: Racion, $foto: string, $graduacion: number, $ibu: number, $proveedor: string) {
      this.$descripcion = $descripcion;
      this.$nombre = $nombre;
      this.$precio = $precio;
      this.$racion = $racion;
      this.$foto = $foto;
      this.$graduacion = $graduacion;
      this.$ibu = $ibu;
      this.$proveedor = $proveedor;
    }
    
    public get descripcion(): string {
      return this.descripcion;
    }
  
    public set descripcion(value: string) {
      this.descripcion = value;
    }
  
    public get nombre(): string {
      return this.nombre;
    }
  
    public set nombre(value: string) {
      this.nombre = value;
    }
  
    public get precio(): number {
      return this.precio;
    }
  
    public set precio(value: number) {
      this.precio = value;
    }
  
    public get racion(): Racion {
      return this.racion;
    }
  
    public set racion(value: Racion) {
      this.racion = value;
    }
  
    public get foto(): string {
      return this.foto;
    }
  
    public set foto(value: string) {
      this.foto = value;
    }
  
    public get graduacion(): number {
      return this.graduacion;
    }
  
    public set graduacion(value: number) {
      this.graduacion = value;
    }
  
    public get ibu(): number {
      return this.ibu;
    }
  
    public set ibu(value: number) {
      this.ibu = value;
    }
  
    public get proveedor(): string {
      return this.proveedor;
    }
  
    public set proveedor(value: string) {
      this.proveedor = value;
    }
}
