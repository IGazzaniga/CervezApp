export class Racion {
    private $nombre: string;
    private $precio: number;
    
    constructor(racion: any) {
        this.$nombre = racion.nombre;
        this.$precio = racion.precio;
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

}