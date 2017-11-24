import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import firebase from 'firebase';
import { User } from "../../models/User";

@Injectable()
export class UserService {
  public auth: firebase.auth.Auth;
  private usersDB: firebase.database.Reference;
  private _user: User;

  constructor(public api: Api, public storage: Storage) {
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

  public isUserAuth (): Boolean {
    let user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Comprueba si el usuario existe en la DB, si no es asi, lo agrega.
   */
  _loggedIn(resp): Promise<any> {
    return this.isNewUser(resp).then((user) => {
      if (!user.val()) {
        this._user = new User(resp);
        this.setCurrentUser(this._user).then(()=> {
          this.addUser(this._user);
        });
      } else {
        this._user = new User(user.val());
        this.setCurrentUser(this._user);
      }
    })
  }

  /**
   * Devuelve al usuario si existe, o null en caso contrario. el resultado se muestra con el metodo .val()
   */
  private isNewUser(respUser: any): Promise<any> {
    let uid = respUser.uid;
    return this.usersDB.child(uid).once("value");
  }

  /**
   * Agrega un usuario a la base de datos
   */
  public addUser(user: User) {
    this.usersDB.child(user.$uid).set(user);
  }

  public setCurrentUser (user: User): Promise<any> {
    if (!user) {
      return this.storage.remove("currentUser");
    } else {
      return this.storage.set("currentUser", user);
    }
  }

  public getCurrentUser (): Promise<any> {
    return this.storage.get("currentUser");
  }

  updateProfile (nombre: string, foto: string, direccion: string, horaApertura: Date, horaCierre: Date, localidad: string) {
    this.auth.currentUser.updateProfile({
      displayName: nombre,
      photoURL: foto
    }).then(() => {
      this.usersDB.child(this._user.$uid).update({
        displayName: nombre,
        photoURL: foto,
        direccion: direccion,
        horaApertura: horaApertura,
        horaCierre: horaCierre,
        localidad: localidad
      }).then(() => {
        console.log("se actualiza la info del negocio");
      }).catch((error) => {
        console.log("error en la actualizacion del perfil: ", error);  
      })
    }).catch(function(error) {
      console.log("error en la actualizacion del perfil: ", error);
    });
  }
}


