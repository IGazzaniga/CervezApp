import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Categoria } from '../../models/Categoria';
import { Item } from '../../models/Item';
import { ItemsService } from '../../providers/items/items-service';
import { LoadingProvider } from "../../providers/loading/loading";

/**
 * Generated class for the CategoriaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'lugar-admin/:nombre-neg/:nombre-cat'
})
@Component({
  selector: 'page-categoria-detail',
  templateUrl: 'categoria-detail.html',
})
export class CategoriaDetailPage {
  categoria: Categoria;
  items: Item[];
  nombreNegocio: string;
  spinner: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public itemService: ItemsService,  public alertCtrl: AlertController, public loading:LoadingProvider) {
    this.categoria = this.navParams.get('categoria');
    this.nombreNegocio = this.navParams.get('nombre-neg');
  }

  ionViewDidLoad() {
    this.spinner = true;
    this.itemService.getAll(this.categoria.id).subscribe((items) => {
      this.items = items;
      this.spinner = false;
    });
  }

  public addItem () {
    this.navCtrl.push('NewItemPage', {categoriaId : this.categoria.id});
  }
  public deleteItem (it: Item) {
    let prompt = this.alertCtrl.create({
      title: '',
      message: '¿Desea eliminar el item?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.loading.show();
            this.itemService.delete(it.id).then(()=> {
              this.loading.dissmis();
            });
          }
        }
      ]
    });
    prompt.present();
  }
  public goToItem(it: Item) {
    this.navCtrl.push('ItemDetailPage', {'nombre-neg': this.nombreNegocio, 'nombre-cat': this.categoria.nombre, 'nombre-item': it.nombre, 'item': it});
  }

}
