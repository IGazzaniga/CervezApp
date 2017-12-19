import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/Item';
import { Categoria } from '../../models/Categoria';
import { ItemsService } from '../../providers/items/items-service';

/**
 * Generated class for the CategoriaDetailClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'home/:nombre-neg/:nombre-cat'
})
@Component({
  selector: 'page-categoria-detail-cliente',
  templateUrl: 'categoria-detail-cliente.html',
})
export class CategoriaDetailClientePage {
  categoria: Categoria;
  items: Item[];
  nombreNegocio: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemsService) {
    this.categoria = this.navParams.get('categoria');
    this.nombreNegocio = this.navParams.get('nombre-neg');
  }

  ionViewDidLoad() {
    if (this.categoria) {
      this.itemService.getAll(this.categoria.id).subscribe((items) => {
        this.items = items;
      });
    } else {
      this.navCtrl.setRoot('MainPage');
      this.navCtrl.push('NegocioMainPage', {'nombre': this.nombreNegocio});
    }
  }
    
  public goToItem(it: Item) {
    console.log(it)
    this.navCtrl.push('ItemDetailPage', {'nombre-neg': this.nombreNegocio, 'nombre-cat': this.categoria.nombre, 'nombre-item': it.nombre, 'item': it});
  }

}



