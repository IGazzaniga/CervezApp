import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/User";
import { UserService } from "../../providers/user/user-service";
import { LoadingProvider } from "../../providers/loading/loading";

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
  public place: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public toastCtrl: ToastController, public userService: UserService, public loadingService: LoadingProvider) {
  }

  ionViewDidLoad() {
    this.userService.getCurrentUser().then((user) => {
      this.currentUser = user;
    })
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
    reader.readAsDataURL(this.fileFoto);
  }

  getProfileImageStyle() {
    return 'url(' + this.currentUser.foto + ')'
  }

  getAddress(place:Object){   
      this.place = place;  
      this.currentUser.localidad = place['formatted_address'];
      this.currentUser.urlmap = place['url'];
      this.currentUser.place_id = place['place_id'];
      console.log("Address Object", place);
  }

  validacion(currentUser:User):boolean{
    if(!currentUser.nombre || currentUser.nombre.trim()===""){
      alert("Falta completar el nombre");
      this.loadingService.dissmis();
      return false;
    }
    else if(!this.fileFoto || !currentUser.foto || this.fileFoto.type !== (('image/jpeg') && ('image/png')) || currentUser.foto.trim()===""){
      alert("Debe incluir una foto de perfil válida, con extensión jpg o png");
      this.loadingService.dissmis();
      return false;
    }
    else if(!currentUser.email || currentUser.email.trim()===""){
      alert("Falta completar el mail");
      this.loadingService.dissmis();
      return false;
    }
    else if(!currentUser.direccion || currentUser.direccion.trim()===""){
      alert("Falta completar la dirección");
      this.loadingService.dissmis();
      return false;
    }
    else if(!currentUser.horaApertura || currentUser.horaApertura.toString()===""){
      alert("Falta completar la hora de apertura");
      this.loadingService.dissmis();
      return false;
    }
    else if(!currentUser.horaCierre || currentUser.horaCierre.toString()===""){
      alert("Falta completar la hora de cierre");
      this.loadingService.dissmis();
      return false;
    }
    else if(!currentUser.localidad || currentUser.localidad.trim()===""){
      alert("Falta completar la localidad");
      this.loadingService.dissmis();
      return false;
    }
    else if(!this.place || currentUser.localidad !== this.place['formatted_address']){
      alert("El campo localidad es inválido");
      this.loadingService.dissmis();
      return false;
    }
    console.log(this.fileFoto);
    return true;
  }

  guardar () {
    this.loadingService.show();
    if(this.validacion(this.currentUser)){
        this.userService.saveImageProfile(this.fileFoto).then((snap) => {
        this.currentUser.foto = snap.downloadURL;
        this.userService.updateProfile(this.currentUser).then(() => {
          this.userService.setCurrentUser(this.currentUser).then(() => {
            this.loadingService.dissmis();
            let toast = this.toastCtrl.create({
              message: 'El perfil se actualizo correctamente',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          })
        })
      });
    
  }
  }
}
