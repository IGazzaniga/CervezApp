import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import firebase from 'firebase';
import { User } from "../../models/User";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {
  public auth: firebase.auth.Auth;
  private usersDB: firebase.database.Reference;
  private storageRef: firebase.storage.Reference;
  private _user: User;

  constructor(public api: Api, public storage: Storage, public db: AngularFireDatabase) {
    this.auth = firebase.auth();
    this.usersDB = firebase.database().ref('users');
    this.storageRef = firebase.storage().ref();
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
    if (localStorage.key(0).includes("firebase:authUser")) {
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
    this.usersDB.child(user.uid).set(user);
  }

  public setCurrentUser (user: User): Promise<any> {
    if (!user) {
      return this.storage.remove("currentUser");
    } else {
      return this.storage.set("currentUser", user);
    }
  }

  public getCurrentUser (): Promise<User> {
    return this.storage.get("currentUser");
  }

  public updateProfile (user: User) {
    return this.auth.currentUser.updateProfile({
      displayName: user.nombre,
      photoURL: user.foto
    }).then(() => {
      return this.usersDB.child(user.uid).update({
        nombre: user.nombre || null,
        foto: user.foto || null,
        direccion: user.direccion || null,
        horaApertura: user.horaApertura || null,
        horaCierre: user.horaCierre || null,
        urlmap: user.urlmap || null,
        place_id: user.place_id || null,
        localidad: user.localidad || null
      });
    }).catch(function(error) {
      console.log("error en la actualizacion del perfil: ", error);
    });
  }

  public getAll (place_id:string): Observable<User[]> {
    return this.db.list<User>(this.usersDB, ref => ref.orderByChild('place_id').equalTo(place_id)).valueChanges();
  }

  public saveImageProfile (foto: File) {
    return this.getCurrentUser().then((user) => {
      return this.storageRef.child(`profile-images/${user.uid}.jpg`).put(foto);
    })
  }

  public getUserByUsername(username: string): Promise<any> {
    return this.usersDB.orderByChild('username').equalTo(username).once("value");
  }
  
  public searchNegocio(nombre: string): Promise<any> {
    return this.usersDB.orderByChild('nombre').equalTo(nombre).once("value");
  }
}


