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
    var that = this;
    this.userService.getAlls().subscribe ((users)=> {
      this.negocios = users;
      var marker1, i;
      for (i=0; i < this.negocios.length; i++){
        var address = this.negocios[i].direccion;
        this.geocoder.geocode({'address': address}, function(results, status) {
          if (i == that.negocios.length) {
            i = 0;
          } else {
            i++;
          }
          if (status === 'OK') {
            let latlong = results[0].geometry.location;
            console.log(latlong)
            marker1 = new google.maps.Marker({
              position: latlong,
              map: map,
              animation: google.maps.Animation.DROP,
              title: that.negocios[i].nombre,
              icon: '../assets/icon/marker.png',
              infowindow
            });
            marker1.addListener('click', function() {
              infowindow.open(map, this);
              console.log(marker1.title)
            });
          }
          var link= '<a href=http://localhost:8100/#/home/' +that.negocios[i].username + '>Ir a la carta</a>'
          var infowindow = new google.maps.InfoWindow({
            content: that.negocios[i].nombre+"<br />"+that.negocios[i].direccion+"<br />"+link
          });
        });
        
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
