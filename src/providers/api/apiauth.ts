import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiAuth {
  url: string = 'https://us-central1-cervezapp-a5297.cloudfunctions.net/api';
  token: string;

  constructor(public http: HttpClient) {
      if (firebase.auth().currentUser) {
        firebase.auth().currentUser.getIdToken().then((token) => {
            this.token = token;
        });
      }
  }

  get(endpoint: string, params?: any) {
    var reqOpts = {};
    reqOpts['params'] = params;
    reqOpts['headers'] = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts['headers'] = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    reqOpts['headers'] = { 'Authorization': 'Bearer ' + this.token };
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    reqOpts['headers'] = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    reqOpts['headers'] = { 'Authorization': 'Bearer ' + this.token };
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
