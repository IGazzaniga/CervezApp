import {UserService} from '../../providers/user/user-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/User";
import { Categoria } from "../../models/Categoria";
import { CategoriasService } from "../../providers/categorias/categorias-service";

/**
 * Generated class for the NegocioMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory: ['MainPage'],
  segment: 'home/:nombre'
})
@Component({
  selector: 'page-negocio-main',
  templateUrl: 'negocio-main.html',
})
export class NegocioMainPage {
  negocio: User;
  categorias: Categoria[];
  spinner: Boolean;

  constructor(public navCtrl: NavController, public userService: UserService, public navParams: NavParams, public categoriaService: CategoriasService) {
    this.negocio = this.navParams.get('negocio');
  }


  ionViewDidLoad() {
    this.spinner = true;
    if (this.negocio) {
      this.categoriaService.getAll(this.negocio.uid).subscribe((categorias) => {
        this.categorias = categorias;
        this.spinner = false;
      });
    } else {
      let username = this.navParams.get('nombre');
      this.userService.getUserByUsername(username).then((data) => {
        if (data.val()) {
          this.negocio = this.returnNegocio(data, username);
          this.categoriaService.getAll(this.negocio.uid).subscribe((categorias) => {
            this.categorias = categorias;
            this.spinner = false;
          })
        } else {
          this.navCtrl.setRoot('MainPage');
        }
      })
    }
  }

  public goToCategoria (cat: Categoria) {
    this.navCtrl.push('CategoriaDetailClientePage', {'nombre-neg': this.negocio.username, 'nombre-cat': cat.nombre, 'categoria': cat});
  }

  private returnNegocio (data: any, username: string): User {
    for (var key in data.val()) {
      if (data.val().hasOwnProperty(key)) {
        var element = data.val()[key];
      }
    }
    if (element) {
      return new User(element);
    } else {
      null;
    }
  }

}
