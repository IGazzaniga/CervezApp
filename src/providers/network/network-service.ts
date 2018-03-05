import {ToastController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

declare var Connection: any;

@Injectable()
export class NetworkService {

  constructor(
    public toastCtrl: ToastController) {
  }

  /**
  */
  public onDisconect() {
    window.addEventListener('offline',  () => {
        this.showNoConnectionMessage();
    });
  }

  public onConnect() {
    window.addEventListener('online',  () => {
        this.showConnectionMessage();
    });
  }

  public showConnectionMessage() {
    let toast = this.toastCtrl.create({
      message: 'Ya tienes conexion! :)',
      position: 'bottom',
      duration: 3000,
      showCloseButton: false,
      closeButtonText: 'OK'
    });

    toast.present();
  }

  /**
  */
  public showNoConnectionMessage() {
    let toast = this.toastCtrl.create({
      message: 'Ups! No tenés conexión a internet',
      position: 'bottom',
      duration: 3000,
      showCloseButton: false,
      closeButtonText: 'OK'
    });

    toast.present();
  }
}
