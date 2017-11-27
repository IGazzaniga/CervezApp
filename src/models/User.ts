export class User {
    email: string;
    nombre: string;
    foto: string;
    uid: string;
    direccion: string;
    horaApertura: Date;
    horaCierre: Date;
    localidad: string;

    constructor(userLogin: any) {
        this.email = userLogin.email;
        this.nombre = userLogin.displayName;
        this.foto = userLogin.photoURL;
        this.uid = userLogin.uid;
    }

}