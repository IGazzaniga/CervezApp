import {LoadingProvider} from '../../providers/loading/loading';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public loading: LoadingProvider) {
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

  public getNegociosByName(ev) {
    let val = ev.target.value;
    if (val.trim() == '') {
      this.negocios = [];
    } else {
      this.loading.show();
      this.userService.getByName(val).subscribe((users) => {
        this.negocios = users;
        this.loading.dissmis();
      })
    }
  }

  getAddress(place:Object) {
    this.loading.show();    
    this.userService.getByLocation(place['place_id']).subscribe((users) => {
      this.negocios = users;
      this.loading.dissmis();
    })
    console.log("Address Object", place);
  }

}
