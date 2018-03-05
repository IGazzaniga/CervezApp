import {AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

declare var Connection: any;

@Injectable()
export class AlertsService {

  constructor(
    private alertCtrl: AlertController) {
  }

  public basicAlert (title: string, msj: string, buttons: string[]) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: msj,
        buttons: buttons
    });
    alert.present();
  }

}
