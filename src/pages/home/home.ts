import {UserService} from '../../providers/user/user-service';
import {Categoria} from '../../models/Categoria';
import { Component } from '@angular/core';
import { ModalController, ActionSheetController, MenuController, IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { CategoriasService } from "../../providers/categorias/categorias-service";
import { User } from '../../models/User';
import { Item } from '../../models/Item';
import { ItemsService } from '../../providers/items/items-service';
import { LoadingProvider } from "../../providers/loading/loading";
import { PopoverCategoryPage } from "./popover-category";

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
  public menuCtrl: MenuController, public alertCtrl: AlertController, public loadingService: LoadingProvider, public popoverCtrl: PopoverController) {
      
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.spinner = true;
    this.userService.getCurrentUser().then((user) => {
      if (this.userService.isCompleteInfo(user)) {
        this.negocio = user;
        this.categoriasService.getAll(user.uid).subscribe((categorias) => {
          this.categorias = categorias;
          this.spinner = false;
        })
        if (this.negocio.prueba == false && this.negocio.pago == false) {
          alert("Su período de prueba/pago expiró y ya no está apareciendo en nuestra plataforma. Para más información, enviar un mail a info@quepinta.com")
        }
      } else {
        this.navCtrl.setRoot('ProfilePage')
      }
    })
  }

  ionViewCanEnter(): boolean{
    //solo se puede entrar al home cuando hay un usuario logueado
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
  
  public goToCategoria (cat: Categoria) {
    this.navCtrl.push('CategoriaDetailPage', {'nombre-neg': this.negocio.username, 'nombre-cat': cat.nombre, 'categoria': cat});
  }

  presentPopover(myEvent, cat) {
    let popover = this.popoverCtrl.create(PopoverCategoryPage, {cat: cat}, {cssClass: 'custom-popover'});
    popover.present({
      ev: myEvent
    });
  }

}