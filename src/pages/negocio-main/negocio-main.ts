import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/User";
import { Categoria } from "../../models/Categoria";
import { CategoriasService } from "../../providers/categorias/categorias-service";

/**
 * Generated class for the NegocioMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-negocio-main',
  templateUrl: 'negocio-main.html',
})
export class NegocioMainPage {
  negocio: User;
  categorias: Categoria[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriasService) {
    this.negocio = this.navParams.get('negocio');
  }

  ionViewDidLoad() {
    this.categoriaService.getAll(this.negocio.uid).subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

}
