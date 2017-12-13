import { Item } from '../../models/Item'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsService } from "../../providers/items/items-service";
import { UserService } from "../../providers/user/user-service";
import { CategoriasService } from '../../providers/categorias/categorias-service';
import { NewItem } from '../../models/New-Item';
import { Categoria } from "../../models/Categoria";
import { LoadingProvider } from "../../providers/loading/loading";
import { Racion } from "../../models/Racion";

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
  private categoriaId: string;
  public newItemForm: any = {};
  public categorias: Categoria[];
  public esCerveza: Boolean = false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemsService: ItemsService,
    public categoriasService: CategoriasService, public userService: UserService, public loadingService: LoadingProvider) {
  }

  ionViewDidLoad() {
    this.categoriaId = this.navParams.get('categoriaId');
    let racionInit = new Racion({nombre: '', precio: ''});
    this.newItemForm.raciones = [racionInit];
    this.newItemForm.stock = true;
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
    this.loadingService.show();
    let newItem = new NewItem(this.newItemForm);
    this.itemsService.add(newItem, this.categoriaId).then((resp) => {
      this.loadingService.dissmis();
      this.navCtrl.pop();
    });
  }

  public addRacion (event) {
    event.preventDefault();
    this.newItemForm.raciones.push({nombre: '', precio: ''});
  }

  public removeRacion (index) {
    this.newItemForm.raciones.splice(index, 1);
  }

}
