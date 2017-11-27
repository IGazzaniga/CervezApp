import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Categoria } from '../../models/Categoria';
import { Item } from '../../models/Item';

/**
 * Generated class for the CategoriaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria-detail',
  templateUrl: 'categoria-detail.html',
})
export class CategoriaDetailPage {
  categoria: Categoria;
  item: Item[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaDetailPage');
  }

}
