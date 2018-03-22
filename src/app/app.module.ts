import {NetworkService} from '../providers/network/network-service';
import {UserService} from '../providers/user/user-service';
import {ItemsService} from '../providers/items/items-service';
import {Api} from '../providers/api/api';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';


import { envprod } from "../config/env.prod";
import { CategoriasService } from '../providers/categorias/categorias-service';

import firebase from 'firebase';
import { CategoriaCardComponentModule } from "../components/categoria-card/categoria-card.module";
import { LoadingProvider } from '../providers/loading/loading';
import { GeoProvider } from '../providers/geo/geo-service';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { PopoverCategoryPage } from "../pages/home/popover-category";
import { AlertsService } from "../providers/alerts/alerts-service";
import { ApiAuth } from "../providers/api/apiauth";


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

firebase.initializeApp(envprod.firebase);

@NgModule({
  declarations: [
    MyApp,
    PopoverCategoryPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(envprod.firebase),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition',
      swipeBackEnabled: true,
      //locationStrategy: 'path'
    }),
    CategoriaCardComponentModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverCategoryPage
  ],
  providers: [
    Api,
    ApiAuth,
    ItemsService,
    UserService,
    CategoriasService,
    Geolocation,
    AngularFireDatabase,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    GeoProvider,
    NotificationsProvider,
    NetworkService,
    AlertsService
  ]
})
export class AppModule { }
