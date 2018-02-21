import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { Categoria } from '../../models/Categoria';
import { Item } from '../../models/Item';
import { ItemsService } from '../../providers/items/items-service';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: ':nombre-neg/:nombre-cat/:nombre-item'
})
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  item: Item;
  nombreNegocio: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
    this.nombreNegocio = this.navParams.get('nombre-neg');
  }

  ionViewDidLoad() {
    if (!this.item) {
      this.navCtrl.setRoot('MainPage');
      this.navCtrl.push('NegocioMainPage', {'nombre': this.nombreNegocio});
    }
  }
}
