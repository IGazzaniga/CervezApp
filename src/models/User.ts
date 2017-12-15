export class User {
    email: string;
    username: string;
    nombre: string;
    foto: string;
    uid: string;
    direccion: string;
    horaApertura: Date;
    horaCierre: Date;
    localidad: string;
    patrocinado: boolean;
    urlmap: string;

    constructor(userLogin: any) {
        this.email = userLogin.email;
        this.username = userLogin.username || null;
        this.nombre = userLogin.displayName || userLogin.nombre || null;
        this.foto = userLogin.photoURL || userLogin.foto || null;
        this.uid = userLogin.uid;
        this.direccion = userLogin.direccion || null;
        this.horaApertura = userLogin.horaApertura || null;
        this.horaCierre = userLogin.horaCierre || null;
        this.localidad = userLogin.localidad || null;
        this.patrocinado = userLogin.patrocinado || null;
        this.urlmap = userLogin.urlmap || null;
    }

}