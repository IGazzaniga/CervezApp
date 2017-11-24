import {UserService} from '../../providers/user/user-service';
import {Categoria} from '../../models/Categoria';
import { Component } from '@angular/core';
import { ModalController, ActionSheetController, MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriasService } from "../../providers/categorias/categorias-service";

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

  constructor(public navCtrl: NavController, public userService: UserService, public categoriasService: CategoriasService, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);  
  }

  ionViewDidLoad() {
    this.userService.getCurrentUser().then((user) => {
      this.categoriasService.getAll(user.uid).subscribe((categorias) => {
        this.categorias = categorias;
      })
    })
  }

  public add () {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Agregar a la Carta',
      buttons: [
        {
          text: 'Categoria',
          handler: () => {
            this.addCategory();
          }
        },{
          text: 'Items',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public addCategory () {
    this.navCtrl.push('NewCategoryPage');
  }

}
