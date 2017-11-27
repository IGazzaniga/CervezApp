import { Item } from "./Item";

export class Categoria {
    private $id: string;
    private $nombre: string;
    private $idNegocio: string;
    private $items: Item[];

	constructor(categoria: any) {
		this.$id = categoria.id;
		this.$nombre = categoria.nombre;
		this.$idNegocio = categoria.idNegocio;
		this.$items = categoria.items || [];
  	}
  

  	public get id(): string {
		return this.id;
	}

	public set id(value: string) {
		this.id = value;
	}

	public get nombre(): string {
		return this.nombre;
	}

	public set nombre(value: string) {
		this.nombre = value;
	}

	public get idNegocio(): string {
		return this.idNegocio;
	}

	public set idNegocio(value: string) {
		this.idNegocio = value;
	}

	public get items(): Item[] {
		return this.items;
	}

	public set items(value: Item[]) {
		this.items = value;
	}
}