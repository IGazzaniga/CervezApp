import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserService } from "../../providers/user/user-service";
import { User } from "../../models/User";
import { NotificationsProvider } from "../../providers/notifications/notifications";

/**
 * Generated class for the NotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {
  descripcion: string;
  currentUser: User;
  disabledButton: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public userService: UserService, public notificacionsService: NotificationsProvider, public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    this.userService.getCurrentUser().then((user) => {
      this.currentUser = user;
    })
  }

  ionViewCanEnter(): boolean{
    if(this.userService.isUserAuth()){
      return true;
    } else {
      this.navCtrl.setRoot('MainPage');
      return false;
    }
  }

  public enviar () {
    this.disabledButton = true;
    this.notificacionsService.sentNotification(this.currentUser, this.descripcion).subscribe((data) => {
      this.descripcion = '';
      this.currentUser.notificacionesRestantes = (this.currentUser.notificacionesRestantes-1);
      var userUpdate = new User(this.currentUser);
      this.userService.updateProfile(userUpdate).then(() => {
        this.userService.setCurrentUser(userUpdate).then(() => {
          alert("Le quedan " + this.currentUser.notificacionesRestantes + " disponibles");
          this.disabledButton = false;
        })
      })
      let toast = this.toastCtrl.create({
        message: 'La notificaciones se envio correctamente a todo los usuarios de la aplicacion',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    })
  }

}
