import {UserService} from '../../providers/user/user-service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuController, IonicPage,  NavController,  ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: "", password: ""  
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public userService: UserService,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public translateService: TranslateService) {
      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      })
  }

  ionViewDidLoad () {
    this.menuCtrl.enable(false);
  }

  ionViewCanEnter(): boolean{
    //solo se puede entrar al login cuando no hay un usuario logueado
    if(!this.userService.isUserAuth()){
      return true;
    } else {
      this.navCtrl.setRoot('HomePage');
      return false;
    }
  }

  // Attempt to login in through our User service
  doLogin() {
    this.userService.login(this.account).catch((err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
