import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../../models/User";

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NotificationsProvider Provider');
  }

  public sentNotification (negocio: User, descripcion: string) {
    let body = {
      app_id: "b9ec6e45-e209-4bac-bdbf-a37ed5e77207",
      included_segments: ["All"],
      headings: { 'en': negocio.nombre},
      contents: { 'en': descripcion },
      url: '/home/'+negocio.username,
      chrome_web_icon: negocio.foto
    }
    let headers = { 'Authorization': 'Basic ' + 'NWJlNDI4ZDQtZDg3Mi00ZjViLWI2MWUtMmI1MzQwZDI1MGNj' }
    let options = { headers: headers }
    return this.http.post('https://onesignal.com/api/v1/notifications', body, options);
  }

}
