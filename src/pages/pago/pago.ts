import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/user/user-service";
import { User } from "../../models/User";
import { Api } from "../../providers/api/api";
import { ApiMP } from "../../providers/api/api-mp";
declare var Mercadopago;
declare function getBin();


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public apimp: ApiMP) {
  }

  ionViewDidLoad() {
    this.userService.getCurrentUser().then((user) => {
      this.currentUser = user;
    })
    var params = {
      "grant_type": "client_credentials",
      "client_id": "6892242983944155",
      "client_secret": "TQ0RA4WdF8UrQ4C9mSKty9ftOmqJAMlC"
    }
    let reqOpts = {};
    reqOpts['params'] = params;
    reqOpts['headers'] = {			
			"accept": "application/json",
			"content-type": "application/x-www-form-urlencoded"
		};
    this.apimp.post('oauth/token', {}, reqOpts).subscribe((data:any) => {
      this.access_token = data.access_token;
    });
  }

  public basico () {
    var preference = {
      items: [
        {
          id: '1',
          title: 'Abono Basico QuePinta',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 300
        }
      ]
    };
    let reqOpts = {};
    reqOpts['params'] = {"access_token": this.access_token};
    this.apimp.post('checkout/preferences', preference, reqOpts).subscribe((data:any) => {
      window.open(data.sandbox_init_point);
    })
  }

  public intermedio () {
    var item = {
      id: '2',
      title: 'Abono Intermedio QuePinta',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: 600
    }
    var preference = {
      items: [
        item
      ]
    };
    let reqOpts = {};
    reqOpts['params'] = {"access_token": this.access_token};
    this.apimp.post('checkout/preferences', preference, reqOpts).subscribe((data:any) => {
      window.open(data.sandbox_init_point);
    })
  }
};


