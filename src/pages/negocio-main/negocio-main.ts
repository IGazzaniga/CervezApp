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

@IonicPage({
  defaultHistory: ['MainPage'],
  segment: 'lugar/:nombre'
})
@Component({
  selector: 'page-negocio-main',
  templateUrl: 'negocio-main.html',
})
export class NegocioMainPage {
  negocio: User;
  categorias: Categoria[];
  spinner: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriasService) {
    this.negocio = this.navParams.get('negocio');
  }


  ionViewDidLoad() {
    this.spinner = true;
    this.categoriaService.getAll(this.negocio.uid).subscribe((categorias) => {
      this.categorias = categorias;
      this.spinner = false;
    });
  }

  public goToCategoria (cat: Categoria) {
    this.navCtrl.push('CategoriaDetailPage', {'nombre-neg': this.negocio.nombre, 'nombre-cat': cat.nombre, 'categoria': cat});
  }


}
