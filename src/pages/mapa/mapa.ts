import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

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
  segment = 'mapa';
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
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
    console.log(latitude, longitude);
        
    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 15
    });
    console.log(document.getElementById('map'));
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!',
        infowindow
      });
      infowindow.open(this.map,marker);
     
    });
    var infowindow = new google.maps.InfoWindow({
      content: "Usted se encuentra aquí"
    });
    google.maps.event.addDomListener(window, 'resize', ()=> {
      this.map.setCenter(myLatLng);
  });

  };
  
      
  
  
  public selectSegment(select) {
    if (select == 'home') {
      this.navCtrl.setRoot('MainPage');
    } else if (select == 'search') {
      this.navCtrl.setRoot('SearchPage');
    }

  }

}
