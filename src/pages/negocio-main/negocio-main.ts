import {UserService} from '../../providers/user/user-service';
import { Component } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/User";
import { Categoria } from "../../models/Categoria";
import { CategoriasService } from "../../providers/categorias/categorias-service";

declare var google;
/**
 * Generated class for the NegocioMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory: ['MainPage'],
  segment: 'n/:nombre'
})
@Component({
  selector: 'page-negocio-main',
  templateUrl: 'negocio-main.html',
})
export class NegocioMainPage {
  negocio: User;
  geocoder = new google.maps.Geocoder;
  categorias: Categoria[];
  map: any;
  spinner: Boolean;
  options = 'carta';

  constructor(public navCtrl: NavController, public userService: UserService, public navParams: NavParams, public categoriaService: CategoriasService, public geolocation: Geolocation) {
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
      this.userService.getUserByUsername(username).subscribe((user) => {
        if (user) {
          this.negocio = user;
          this.categoriaService.getAll(this.negocio.uid).subscribe((categorias) => {
            this.categorias = categorias;
            this.spinner = false;
          })
        } else {
          alert("Este negocio esta temporalmente inactivo");
          this.navCtrl.setRoot("MainPage");
        }
      })
    }
  }

  public goToCategoria (cat: Categoria) {
    this.navCtrl.push('CategoriaDetailClientePage', {'nombre-neg': this.negocio.username, 'nombre-cat': cat.nombre, 'categoria': cat});
  }

  hideMap(){
    var map = document.getElementById('map')
    document.getElementById('map').classList.remove('show-map');
    document.getElementById('ver').classList.remove('hide-text');
    document.getElementById('ocultar').classList.remove('show-text');
  }

  loadMap(negocio){
    let latlong;
    var address = this.negocio.direccion;
    this.geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        latlong = results[0].geometry.location;
      }
      // create map
      var map = new google.maps.Map(document.getElementById('map'), {
        center: latlong,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      var marker1;            
      marker1 = new google.maps.Marker({
        position: latlong,
        map: map,
        animation: google.maps.Animation.DROP,
        title: negocio.nombre,
        icon: '../assets/icon/marker.png'
      });
      document.getElementById('map').classList.add('show-map');
      document.getElementById('ver').classList.add('hide-text');
      document.getElementById('ocultar').classList.add('show-text');
    });
   }

}
