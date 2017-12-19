
import {UserService} from '../providers/user/user-service';
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { User } from "../models/User";
import { Settings } from "../providers/settings/settings";

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button menuClose ion-item (click)="logout()">
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
    { title: 'Home', component: 'HomePage' },
    { title: 'Perfil', component: 'ProfilePage'}
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings,
              private config: Config, private userService: UserService) {
    this.checkAuthUser();
  }

  /**
   * Evento que se dispara cuando el estado de Autenticacion de un usuario cambia.
   * user es null cuando el usuario no esta logueado
   */
  checkAuthUser() {
    this.userService.auth.onAuthStateChanged((userResp) => {
      if (userResp) {
        this.userService._loggedIn(userResp).then(()=> {
          this.rootPage = 'HomePage';
        });
      } else {
        this.rootPage = 'MainPage';
        this.userService.setCurrentUser(null);
      }
    })
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout () {
    this.userService.logout();
  }
}
