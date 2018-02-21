import { Component } from '@angular/core';
import {MenuController, IonicPage,  NavController,  NavParams} from 'ionic-angular';
import { UserService } from "../../providers/user/user-service";
import { User } from "../../models/User";
import { Geolocation } from '@ionic-native/geolocation';
import { GeoProvider } from "../../providers/geo/geo-service";


/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'home'
})
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  public negocios: User[];
  spinner: Boolean;
  location: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public menuCtrl:MenuController, public userService: UserService, 
  private geolocation: Geolocation, public geoService: GeoProvider) {
    this.menuCtrl.enable(false);  
  }

  ionViewDidLoad() {
    this.spinner = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoService.getLocationName(resp.coords.latitude, resp.coords.longitude).subscribe((data:any) => {
        if (data.results) {
          this.location = data.results[1].formatted_address;
          let place_id = data.results[1].place_id;
          this.userService.getAll(place_id).subscribe((negocios) => {
            this.negocios = negocios;
            this.spinner = false;
          })
        }
      });
    }).catch((err) => {
      console.log(err);
      this.negocios = [];
      this.spinner = false;
    });
  }

  public goToNegocio (neg: User) {
    this.navCtrl.push('NegocioMainPage', {'nombre': neg.username, 'negocio': neg});
  }

  public goToLogin () {
    this.navCtrl.push('LoginPage');
  }

  public selectSegment(select) {
    if (select == 'search') {
      this.navCtrl.setRoot('SearchPage');
    } else if (select == 'mapa') {
      this.navCtrl.setRoot('MapaPage');
    }
  }

}
  



