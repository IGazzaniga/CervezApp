import {Categoria} from '../../models/Categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriasService } from "../../providers/categorias/categorias-service";
import { UserService } from "../../providers/user/user-service";

/**
 * Generated class for the NewCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-category',
  templateUrl: 'new-category.html',
})
export class NewCategoryPage {
  public newCategory: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public categoriasService: CategoriasService, public userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCategoryPage');
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
    this.categoriasService.add(this.newCategory).then((resp) => {
      this.navCtrl.pop();
    });
  }

}
