import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/User";
import { UserService } from "../../providers/user/user-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public userService: UserService) {
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
    this.userService.saveImageProfile(event.target.files[0]).then((snap) => {
      this.currentUser.foto = snap.downloadURL;
    });
  }

  getProfileImageStyle() {
    return 'url(' + this.currentUser.foto + ')'
  }

  guardar () {
    this.userService.updateProfile(this.currentUser).then(() => {
      this.userService.setCurrentUser(this.currentUser).then(() => {
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
