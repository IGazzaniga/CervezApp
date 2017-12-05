import { Injectable } from '@angular/core';
import { LoadingController, Loading } from "ionic-angular";

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  public loading:Loading ;

  constructor(public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
  }

  public show () {
    this.loading.present();
  }

  public dissmis () {
    this.loading.dismiss();
  }

}
