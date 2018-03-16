import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/user/user-service";
import { User } from "../../models/User";
import { Api } from "../../providers/api/api";
import { LoadingProvider } from "../../providers/loading/loading";


/**
 * Generated class for the PagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'pago'
})
@Component({
  selector: 'page-pago',
  templateUrl: 'pago.html',
})
export class PagoPage {
  currentUser: User;
  access_token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public loadingService: LoadingProvider, public api: Api) {
  }

  ionViewDidLoad() {
    this.userService.getCurrentUser().then((user) => {
      this.currentUser = user;
    })
  }

  public basico () {
    this.loadingService.show();
    var param = {"email": this.currentUser.email, "uid": this.currentUser.uid};
    this.api.get('pay-basic', param).subscribe((data:any) => {
      this.loadingService.dissmis();
      window.open(data.init_point);
    })
  }

  public intermedio () {
/*    var item = {
      id: '2',
      title: 'Abono Intermedio QuePinta',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: 1
    }
    var preference = {
      items: [
        item
      ]
    };
    let reqOpts = {};
    reqOpts['params'] = {"access_token": this.access_token};
    this.apimp.post('checkout/preferences', preference, reqOpts).subscribe((data:any) => {
      window.open(data.init_point);
    })*/
  }
};


