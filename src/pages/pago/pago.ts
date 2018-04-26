// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { UserService } from "../../providers/user/user-service";
// import { User } from "../../models/User";
// import { LoadingProvider } from "../../providers/loading/loading";
// import { ApiAuth } from "../../providers/api/apiauth";


// /**
//  * Generated class for the PagoPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage({
//   segment: 'pago'
// })
// @Component({
//   selector: 'page-pago',
//   templateUrl: 'pago.html',
// })
// export class PagoPage {
//   currentUser: User;
//   access_token: string;

//   constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public loadingService: LoadingProvider, public apiauth: ApiAuth) {
//   }

//   ionViewDidLoad() {
//     this.userService.getCurrentUser().then((user) => {
//       this.currentUser = user;
//     })
//   }

//   ionViewCanEnter(): boolean{
//     if(this.userService.isUserAuth()){
//       return true;
//     } else {
//       this.navCtrl.setRoot('MainPage');
//       return false;
//     }
//   }

//   public basico () {
//     this.loadingService.show();
//     var param = {"abonoId": "0", "email": this.currentUser.email, "uid": this.currentUser.uid};
//     this.apiauth.get('pay-abono', param).subscribe((data:any) => {
//       this.loadingService.dissmis();
//       location.replace(data.init_point);
//     })
//   }

//   public intermedio () {
//     this.loadingService.show();
//     var param = {"abonoId": "1", "email": this.currentUser.email, "uid": this.currentUser.uid};
//     this.apiauth.get('pay-abono', param).subscribe((data:any) => {
//       this.loadingService.dissmis();
//       location.replace(data.init_point);
//     })
//   }
// };


