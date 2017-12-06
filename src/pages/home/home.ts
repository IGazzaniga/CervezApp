import {UserService} from '../../providers/user/user-service';
import {Categoria} from '../../models/Categoria';
import { Component } from '@angular/core';
import { ModalController, ActionSheetController, MenuController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoriasService } from "../../providers/categorias/categorias-service";
import { User } from '../../models/User';
import { Item } from '../../models/Item';
import { ItemsService } from '../../providers/items/items-service';
import { LoadingProvider } from "../../providers/loading/loading";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'admin'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public categorias: Categoria[] = [];
  public items: Item[] = [];
  negocio: User;
  spinner: Boolean = false;

  constructor(public navCtrl: NavController, public userService: UserService, 
  public categoriasService: CategoriasService, public itemsService: ItemsService, 
  public navParams: NavParams, public actionSheetCtrl: ActionSheetController, 
  public menuCtrl: MenuController, public alertCtrl: AlertController, public loadingService: LoadingProvider) {
      
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.spinner = true;
    this.userService.getCurrentUser().then((user) => {
      this.negocio = user;
      this.categoriasService.getAll(user.uid).subscribe((categorias) => {
        this.categorias = categorias;
        this.spinner = false;
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
    let prompt = this.alertCtrl.create({
      title: '',
      message: '¿Desea eliminar la categoría?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.loadingService.show();
            this.categoriasService.delete(cat.id).then(()=> {
              this.loadingService.dissmis();
            });
          }
        }
      ]
    });
    prompt.present();
  }
    
  public goToCategoria (cat: Categoria) {
    this.navCtrl.push('CategoriaDetailPage', {'nombre-neg': this.negocio.username, 'nombre-cat': cat.nombre, 'categoria': cat});
  }

}