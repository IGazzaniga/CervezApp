import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { UserService } from "../../providers/user/user-service";
import { User } from "../../models/User";

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

  constructor(public navCtrl: NavController, public userService: UserService, public navParams: NavParams, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  ionViewWillEnter(){
    this.getPosition();
  }

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
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
          marker1 = new google.maps.Marker({
            position: latlong,
            map: map,
            animation: google.maps.Animation.DROP,
            title: nombre,
            icon: '../assets/icon/marker.png'
          });
          var link= '<a href=http://localhost:8100/#/home/' + username + '>Ir a la carta</a>';
          google.maps.event.addListener(marker1, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(nombre + "<br />" + direccion + "<br />" + link);
              infowindow.open(map, marker);
            }
          })(marker1, i));
        }
      }
    })
    google.maps.event.addListenerOnce(map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.BOUNCE,
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
