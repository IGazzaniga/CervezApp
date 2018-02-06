export class User {
    email: string;
    username: string;
    nombre: string;
    foto: string;
    uid: string;
    ult_loc_valida: string;
    direccion: string;
    horaApertura: Date;
    horaCierre: Date;
    localidad: string;
    patrocinado: boolean;
    urlmap: string;
    place_id: string;
    marker: string;

    constructor(userLogin: any) {
        this.email = userLogin.email;
        this.username = userLogin.username || null;
        this.nombre = userLogin.displayName || userLogin.nombre || null;
        this.foto = userLogin.photoURL || userLogin.foto || null;
        this.uid = userLogin.uid;
        this.ult_loc_valida = userLogin.ult_dir_valida || null;
        this.direccion = userLogin.direccion || null;
        this.horaApertura = userLogin.horaApertura || null;
        this.horaCierre = userLogin.horaCierre || null;
        this.localidad = userLogin.localidad || null;
        this.patrocinado = userLogin.patrocinado || null;
        this.urlmap = userLogin.urlmap || null;
        this.place_id = userLogin.place_id || null;
        this.marker = userLogin.marker || null;
    }

}