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

  getAddress(place:Object) {       
      this.currentUser.localidad = place['formatted_address'];
      this.currentUser.urlmap = place['url'];
      this.currentUser.place_id = place['place_id'];
      console.log("Address Object", place);
  }

  guardar () {
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
              position: 'top'
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
            position: 'top'
          });
          toast.present();
        })
      })
    }
  }
}
