import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { UserService } from "../../providers/user/user-service";
import { User } from "../../models/User";
import { AlertsService } from "../../providers/alerts/alerts-service";

declare var google;

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  geocoder = new google.maps.Geocoder;
  segment = 'mapa';
  map: any;
  public negocios : User[];
  horaActual: number;
  minutosActual: number;
  diaActual: number;
  desactivedUbication: boolean = false;

  constructor(public navCtrl: NavController, public alertsService: AlertsService, public userService: UserService, public navParams: NavParams, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  ionViewWillEnter(){
    let actualDate = new Date();
    this.diaActual = actualDate.getDay();
    this.horaActual = actualDate.getHours();
    this.minutosActual = actualDate.getMinutes();
    this.getPosition();
  }

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      this.alertsService.basicAlert('Atencion!', 'La ubicacion del dispositivo se encuentra desactivada, active la ubicacion para el correcto funcionamiento de la aplicacion.', ['Aceptar']);
      this.desactivedUbication = true;
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // create LatLng object
    let myLatLng = new google.maps.LatLng(latitude, longitude);
    // create map
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.userService.getAlls().subscribe ((users)=> {
      this.negocios = users;
      var infowindow = new google.maps.InfoWindow();
      var marker1, i;
      for (i=0; i < this.negocios.length; i++){
        if (this.negocios[i].direccion && this.negocios[i].marker){
          let latlong = new google.maps.LatLng(this.negocios[i].marker[0], this.negocios[i].marker[1]);
          let nombre = this.negocios[i].nombre;
          let username = this.negocios[i].username;
          let direccion = this.negocios[i].direccion;
          let hhHasta: string;
          let hhvalid = false
          if (this.negocios[i].happyHours) {
            this.negocios[i].happyHours.forEach(hh => {
              if (parseFloat(hh.dia) == this.diaActual) {
                var ha = hh.horaApertura.split(':'); 
                var secondsHA = (parseFloat(ha[0]) * 3600) + (parseFloat(ha[1]) * 60);
                hhHasta = hh.horaCierre;
                var hc = hh.horaCierre.split(':'); 
                var secondsHC = (parseFloat(hc[0]) * 3600) + (parseFloat(hc[1]) * 60);
                var secondsHAC = (this.horaActual*3600) + (this.minutosActual*60); 
                if (secondsHA < secondsHAC && secondsHAC < secondsHC) {
                  hhvalid = true;
                }
              }
            });
          }
          if (hhvalid) {
            marker1 = new google.maps.Marker({
              position: latlong,
              map: map,
              animation: google.maps.Animation.BOUNCE,
              title: nombre,
              icon: '../assets/icon/marker-HH.png',
              infowindow
            });
            google.maps.event.addListener(marker1, 'click', (function(marker1, i) {
              return function() {
                infowindow.setContent('HappyHours Hasta las ' + hhHasta + "<br />" + nombre + "<br />" + direccion + "<br />" + '<a href=/' + username + '>Ir a la carta</a>');
                infowindow.open(map, marker1);
              }
            })(marker1, i));
          } else {
            marker1 = new google.maps.Marker({
              position: latlong,
              map: map,
              animation: google.maps.Animation.DROP,
              title: nombre,
              icon: '../assets/icon/marker.png'
            });
            google.maps.event.addListener(marker1, 'click', (function(marker1, i) {
              return function() {
                infowindow.setContent(nombre + "<br />" + direccion + "<br />" + '<a href=/' + username + '>Ir a la carta</a>');
                infowindow.open(map, marker1);
              }
            })(marker1, i));
          }
        }
      }
    })
    google.maps.event.addListenerOnce(map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        infowindow
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
    var infowindow = new google.maps.InfoWindow({
      content: "Usted se encuentra aquí"
    });
    
    google.maps.event.addDomListener(window, 'resize', ()=> {
      map.setCenter(myLatLng);
    });
}
      
  public goToNegocio (neg: User) {
    this.navCtrl.push('NegocioMainPage', {'nombre': neg.username, 'negocio': neg});
  }
  
  public selectSegment(select) {
    if (select == 'home') {
      this.navCtrl.setRoot('MainPage');
    } else if (select == 'search') {
      this.navCtrl.setRoot('SearchPage');
    }

  }

}
