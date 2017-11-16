import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import firebase from 'firebase';
import { User } from "../../models/User";

@Injectable()
export class UserService {
  private auth: firebase.auth.Auth;
  private usersDB: firebase.database.Reference;
  _user: User;

  constructor(public api: Api) {
    this.auth = firebase.auth();
    this.usersDB = firebase.database().ref('users');
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any): Promise<any> {
    return this.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.auth.signOut().then(() => {
      this._user = null;
    }).catch((err) => console.log(err));
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.isNewUser(resp).then((user) => {
      if (!user.val()) {
        this._user = new User(resp);
        this.addUser(this._user);
      } else {
        this._user = new User(user.val());
      }
    })
  }

  private isNewUser(respUser: any): Promise<any> {
    let uid = respUser.uid;
    return this.usersDB.child(uid).once("value");
  }

  private addUser(user: User) {
    this.usersDB.child(user.$uid).set(user);
  }

  updateProfile (nombre: string, foto: string) {
    this.auth.currentUser.updateProfile({
      displayName: nombre,
      photoURL: foto
    }).then(function() {
      console.log("se setea nombre y foto del negocio");
    }).catch(function(error) {
      console.log("error en la actualizacion del perfil: ", error);
    });
  }
}
