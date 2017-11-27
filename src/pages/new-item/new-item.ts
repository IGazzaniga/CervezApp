import { Item } from '../../models/Item'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsService } from "../../providers/items/items-service";
import { UserService } from "../../providers/user/user-service";
import { CategoriasService } from '../../providers/categorias/categorias-service';
import { NewItem } from '../../models/New-Item';
import { Categoria } from "../../models/Categoria";

/**
 * Generated class for the NewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {
  public newItemForm: any = {};
  public categorias: Categoria[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemsService: ItemsService,
    public categoriasService: CategoriasService, public userService: UserService) {
  }

  ionViewDidLoad() {
    this.categorias = this.navParams.get('categorias');
  }

  ionViewCanEnter(): boolean{
    //solo se puede entrar al login cuando no hay un usuario logueado
    if(this.userService.isUserAuth()){
        return true;
      } else {
        this.navCtrl.setRoot('MainPage');
        return false;
      }
  }

  public guardar() {
    let newItem = new NewItem(this.newItemForm);
    this.itemsService.add(newItem).then((resp) => {
      this.navCtrl.pop();
    });
  }

}
