import {NetworkService} from '../providers/network/network-service';

import {UserService} from '../providers/user/user-service';
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, AlertController } from 'ionic-angular';

import { User } from "../models/User";

declare var OneSignal;
declare var Notification;

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          <ion-icon name="{{p.icon}}" item-left></ion-icon>
          {{p.title}}
        </button>
        <button class="log-out" menuClose ion-item (click)="logout()">
          <ion-icon name="log-out" item-left></ion-icon>
          Cerrar Sesion
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'HomePage', icon: 'home' },
    { title: 'Notificaciones', component: 'NotificacionesPage', icon: 'notifications'},
    { title: 'Perfil', component: 'ProfilePage', icon: 'person'}
    //{ title: 'Pagos', component: 'PagoPage', icon: 'card'}
  ]

  constructor(private translate: TranslateService, platform: Platform,
              private config: Config, private userService: UserService, public networkService: NetworkService, public alertCtrl: AlertController) {
    this.networkService.onDisconect();
    this.networkService.onConnect();
    this.checkAuthUser();
  }

  /**
   * Evento que se dispara cuando el estado de Autenticacion de un usuario cambia.
   * user es null cuando el usuario no esta logueado
   */
  checkAuthUser() {
    this.userService.auth.onAuthStateChanged((userResp) => {
      if (userResp) {
        this.userService.refreshUser(userResp).subscribe((user)=> {
          if (window.location.hash.includes('profile')) {
            this.nav.setRoot('ProfilePage');
          } else if (window.location.hash.includes('notificaciones')) {
            this.nav.setRoot('NotificacionesPage');
          } else if (window.location.hash.includes('pago')) {
            this.nav.setRoot('PagoPage');
          } else {
            this.nav.setRoot('HomePage');
          }
        });
      } else {
        this.nav.setRoot('MainPage');
        this.userService.setCurrentUser(null);
        this.notifyMe();
      }
    })
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout () {
    this.userService.logout();
  }

  notifyMe() {
    // Comprobamos si el navegador soporta las notificaciones
    var isPushSupported = OneSignal.isPushNotificationsSupported();
    if (isPushSupported) {
      // Comprobamos si los permisos han sido concedidos anteriormente
      if (Notification.permission == "default") {
        this.showNotifPrompt();
      }
    } else {
      console.log("Las notificaciones no son soportadas")
    }
  }

  showNotifPrompt() {
    const confirm = this.alertCtrl.create({
      title: 'Recibir notificaciones',
      message: 'Desea recibir notificaciones con las novedades de todos los lugares registrados en la app?',
      buttons: [
        {
          text: 'Mas Tarde',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            Notification.requestPermission().then((per) => {
              if (per == 'granted') {
                OneSignal.registerForPushNotifications();
                console.log('notificaciones activadas')
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
