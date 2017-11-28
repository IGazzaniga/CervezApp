import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Categoria } from '../../models/Categoria';
import { Item } from '../../models/Item';
import { ItemsService } from '../../providers/items/items-service';

/**
 * Generated class for the CategoriaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: ':nombre-neg/:nombre-cat'
})
@Component({
  selector: 'page-categoria-detail',
  templateUrl: 'categoria-detail.html',
})
export class CategoriaDetailPage {
  categoria: Categoria;
  items: Item[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemsService) {
    this.categoria = this.navParams.get('categoria');
  }

  ionViewDidLoad() {
    this.itemService.getAll(this.categoria.id).subscribe((items) => {
      this.items = items;
    });
  }

}
