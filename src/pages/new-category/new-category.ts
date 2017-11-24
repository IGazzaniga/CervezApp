import {Categoria} from '../../models/Categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriasService } from "../../providers/categorias/categorias-service";

/**
 * Generated class for the NewCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-category',
  templateUrl: 'new-category.html',
})
export class NewCategoryPage {
  public newCategory: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriasService: CategoriasService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCategoryPage');
  }

  public guardar() {
    this.categoriasService.add(this.newCategory).then((resp) => {
      this.navCtrl.pop();
    });
  }

}
