import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/user/user-service";
import { User } from "../../models/User";

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  public negocios: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {
  }

  ionViewDidLoad() {
    this.userService.getAll().subscribe((negocios) => {
      this.negocios = negocios;
    })
  }

}
