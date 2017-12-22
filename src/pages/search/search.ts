import {UserService} from '../../providers/user/user-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/User";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  segment = 'search';
  public negocios: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  public selectSegment(select) {
    if (select == 'home') {
      this.navCtrl.setRoot('MainPage');
    } else if (select == 'mapa') {
      this.navCtrl.setRoot('MapaPage');
    } 
  }

  public getItems(ev) {
    let val = ev.target.value;
    this.userService.getByName(val).subscribe((users) => {
      this.negocios = users;
    })
  }

}
