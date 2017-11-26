export class User {
    private $email: string;
    private $nombre: string;
    private $foto: string;
    private $uid: string;
    private $direccion: string;
    private $horaApertura: Date;
    private $horaCierre: Date;
    private $localidad: string;

    constructor(userLogin: any) {
        this.$email = userLogin.email;
        this.$nombre = userLogin.displayName;
        this.$foto = userLogin.photoURL;
        this.$uid = userLogin.uid;
    }

	public get email(): string {
		return this.email;
	}

	public set email(value: string) {
		this.email = value;
	}

	public get nombre(): string {
		return this.nombre;
	}

	public set nombre(value: string) {
		this.nombre = value;
	}

	public get uid(): string {
		return this.uid;
	}

	public set uid(value: string) {
		this.uid = value;
	}

	public get foto(): string {
		return this.foto;
	}

	public set foto(value: string) {
		this.foto = value;
	}


	public get direccion(): string {
		return this.direccion;
	}

	public set direccion(value: string) {
		this.direccion = value;
	}

	public get horaApertura(): Date {
		return this.horaApertura;
	}

	public set horaApertura(value: Date) {
		this.horaApertura = value;
	}

	public get horaCierre(): Date {
		return this.horaCierre;
	}

	public set horaCierre(value: Date) {
		this.horaCierre = value;
	}

	public get localidad(): string {
		return this.localidad;
	}

	public set localidad(value: string) {
		this.localidad = value;
	}

}