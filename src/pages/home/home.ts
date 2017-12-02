import {UserService} from '../../providers/user/user-service';
import {Categoria} from '../../models/Categoria';
import { Component } from '@angular/core';
import { ModalController, ActionSheetController, MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriasService } from "../../providers/categorias/categorias-service";
import { User } from '../../models/User';
import { Item } from '../../models/Item';
import { ItemsService } from '../../providers/items/items-service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public categorias: Categoria[] = [];
  public items: Item[] = [];
  negocio: User;

  constructor(public navCtrl: NavController, public userService: UserService, public categoriasService: CategoriasService, public itemsService: ItemsService, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public menuCtrl: MenuController) {
      
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.userService.getCurrentUser().then((user) => {
      this.negocio = user;
      this.categoriasService.getAll(user.uid).subscribe((categorias) => {
        this.categorias = categorias;
      })
    })
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


  public addCategory () {
    this.navCtrl.push('NewCategoryPage');
  }
  public deleteCategory (cat: Categoria) {
    this.categoriasService.delete(cat.id).then(()=> {
    }
  )}
  

  
  
  public goToCategoria (cat: Categoria) {
    this.navCtrl.push('CategoriaDetailPage', {'nombre-neg': this.negocio.nombre, 'nombre-cat': cat.nombre, 'categoria': cat});
  }

}