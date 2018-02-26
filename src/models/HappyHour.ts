export class HappyHour {
    dia: string;
    horaApertura: Date;
    horaCierre: Date;
    
    constructor(happyhour: any) {
        this.dia= happyhour.dia;
        this.horaApertura = happyhour.horaApertura || null;
        this.horaCierre = happyhour.horaCierre || null;
    }
}

