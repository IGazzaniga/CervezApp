import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/User";
import { UserService } from "../../providers/user/user-service";
import { LoadingProvider } from "../../providers/loading/loading";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('fileInput') fileInput;
  public currentUser: User;
  private fileFoto: File;
  geocoder = new google.maps.Geocoder;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public toastCtrl: ToastController, public userService: UserService, public loadingService: LoadingProvider, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.userService.getCurrentUser().then((user) => {
      this.currentUser = user;
    })
    
  }
  ionViewWillEnter(){
    this.getPosition();
  }

  getPicture() {
    this.fileInput.nativeElement.click();
  }
  
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.currentUser.foto = imageData;
    };
    this.fileFoto = event.target.files[0];
    if (this.fileFoto.type != "image/jpg" && this.fileFoto.type != "image/png") {
      alert("Debe incluir una foto de perfil válida, con extensión jpg o png");
      this.fileFoto = null;
    } else {
      reader.readAsDataURL(this.fileFoto);
    }
  }

  getProfileImageStyle() {
    return 'url(' + this.currentUser.foto + ')'
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
    let myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 15,
      zoomControl:true,
    });
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        draggable: true,
        title: 'Arrastra el marcador hasta la dirección de tu negocio',
      });
      marker.addListener('dragend', () => {
       var latlng = {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()};
       this.geocoder.geocode({'location': latlng},(results, status)=> {
       if (status === 'OK') {
          console.log(results[0].address_components);
          this.currentUser.direccion = (results[0].formatted_address);
        }
       })
       
      });

    });
    
    
  }
   
  validacion(currentUser:User):boolean{
    if(!currentUser.nombre || currentUser.nombre.trim()===""){
      alert("Falta completar el nombre");
      return false;
    }
    if(this.fileFoto){
      if (this.fileFoto.type != "image/jpg" && this.fileFoto.type != "image/png") {
        alert("Debe incluir una foto de perfil válida, con extensión jpg o png");
        return false;
      }
    } else if (!currentUser.foto.includes('firebase')) {
        alert("Debe incluir una foto de perfil válida, con extensión jpg o png");
        return false;
    }
    if(!currentUser.email || currentUser.email.trim()===""){
      alert("Falta completar el mail");
      return false;
    }
    if(!currentUser.direccion || currentUser.direccion.trim()===""){
      alert("Falta completar la dirección");
      return false;
    }
    if(!currentUser.horaApertura || currentUser.horaApertura.toString()===""){
      alert("Falta completar la hora de apertura");
      return false;
    }
    if(!currentUser.horaCierre || currentUser.horaCierre.toString()===""){
      alert("Falta completar la hora de cierre");
      return false;
    }
    if(!currentUser.localidad || currentUser.localidad.trim()===""){
      alert("Falta completar la localidad");
      return false;
    }
    /* if(!this.place || currentUser.localidad !== this.place['formatted_address']){
      alert("El campo localidad es inválido");
      return false;
    } */
    return true;
  }

  guardar () {
    if(this.validacion(this.currentUser)){
      this.loadingService.show();
      if (this.fileFoto) {
        this.userService.saveImageProfile(this.fileFoto).then((snap) => {
          this.currentUser.foto = snap.downloadURL;
          this.userService.updateProfile(this.currentUser).then(() => {
            this.userService.setCurrentUser(this.currentUser).then(() => {
              this.loadingService.dissmis();
              let toast = this.toastCtrl.create({
                message: 'El perfil se actualizo correctamente',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            })
          })
        });
      } else {
        this.userService.updateProfile(this.currentUser).then(() => {
          this.userService.setCurrentUser(this.currentUser).then(() => {
            this.loadingService.dissmis();
            let toast = this.toastCtrl.create({
              message: 'El perfil se actualizo correctamente',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          })
        })
      }
    }
  }
}
