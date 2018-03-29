import { UserService } from '../../providers/user/user-service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuController, IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { LoadingProvider } from "../../providers/loading/loading";
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
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

  constructor(
    public loadingCtr: LoadingController,//para el olvido de contraseña
    public alertCtrl: AlertController, //para el olvido de contraseña
    public navCtrl: NavController,
    public userService: UserService,
    public toastCtrl: ToastController,
    public loadingService: LoadingProvider,
    public menuCtrl: MenuController,
    public translateService: TranslateService) {
      this.loginErrorString = "Usuario o contraseña incorrecto. Vuelva a intentarlo"
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
    }
  }

  // Attempt to login in through our User service
  doLogin() {
    this.loadingService.show();
    this.userService.login(this.account)
    .then(() => {
      this.loadingService.dissmis();
    })
    .catch((err) => {
      // Unable to log in
      this.loadingService.dissmis();
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }


  showForgotPassword(){
       //Funcion de olvido de contraseña
       let prompt = this.alertCtrl.create({
         title:'Ingrese su Email',
         message: "Se te enviara el mail de Correspondiente",
         inputs: [
            {
              name : 'recoverEmail',
              placeholder: 'tuEmail@Example.com'
            }, 
          ],
        buttons:[
          {
            text: 'Cancel',
            handler: data =>{
              console.log('cancel click');
          }
          },
          {
            text:'Submit',
            handler: data => {
              //add Preload
              let loading = this.loadingCtr.create({
                  dismissOnPageChange:true,
                  content:'Reseting your password..'
              });
              //call user services
              this.userService.forgotPasswordUser(data.recoverEmail).then(() =>{
                  loading.dismiss().then(() => {
                    //show pop up

                    let alert = this.alertCtrl.create({
                      title: 'Verifique su Email',
                      subTitle: 'Su sontraseña fue reseteada',
                      buttons:['OK']
                    });
                  
                    alert.present();

                  })
              }, error => {
                //show pop up
                let alert = this.alertCtrl.create({
                    title: 'Error en resetear la contraseña',
                    subTitle: error.message,
                    buttons:['OK']
                });
                
                alert.present();

              } );
            }
          }
        ]

       });
       prompt.present();
  }
}
