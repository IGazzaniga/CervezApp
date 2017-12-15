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
  searchedNegocios: User[];
  originalNegocios: User[];
  public negocios: User[];
  spinner: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public menuCtrl:MenuController, public userService: UserService, 
  private geolocation: Geolocation, public geoService: GeoProvider) {
    this.menuCtrl.enable(false);  
  }

  ionViewDidLoad() {
    this.spinner = true;
    this.userService.getAll().subscribe((negocios) => {
      this.negocios = negocios;
      this.searchedNegocios = negocios;
      this.originalNegocios = negocios;
      this.spinner = false;
    })
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoService.getLocationName(resp.coords.latitude, resp.coords.longitude).subscribe((data:any) => {
        if (data.results) {
          alert('Usted esta en: ' + data.results[2].formatted_address);
        }
      });
    });
  }

  public goToNegocio (neg: User) {
    this.navCtrl.push('NegocioMainPage', {'nombre': neg.username, 'negocio': neg});
  }

  public searchNegocio(ev: any) {
    this.negocios = this.originalNegocios;
    this.searchedNegocios = this.negocios;
		let val: string = ev.target.value;
		if (val && val.trim() != '') {
      this.searchedNegocios = this.negocios.filter((negocio) => {
        return (negocio.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
	}
  
}


