import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import firebase from 'firebase';
import { User } from "../../models/User";

@Injectable()
export class UserService {
  public auth: firebase.auth.Auth;
  private usersDB: firebase.database.Reference;
  _user: User;

  constructor(public api: Api) {
    this.auth = firebase.auth();
    this.usersDB = firebase.database().ref('users');
  }

  /**
   *  Metodo de login con Email y Password
   */
  login(accountInfo: any): Promise<any> {
    return this.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
  }

  /**
   * Logout de un usuario
   */
  logout() {
    this.auth.signOut().catch((err) => console.log("error en logout", err));
  }

  /**
   * Comprueba si el usuario existe en la DB, si no es asi, lo agrega.
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

  /**
   * Devuleve al usuario si existe, o null en caso contrario. el resultado se muestra con el metodo .val()
   */
  private isNewUser(respUser: any): Promise<any> {
    let uid = respUser.uid;
    return this.usersDB.child(uid).once("value");
  }

  /**
   * Agrega un usuario a la base de datos
   */
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
