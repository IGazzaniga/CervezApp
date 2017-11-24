import {UserService} from '../user/user-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import { Item } from '../../models/Item';
import { Api } from '../api/api';

import firebase from 'firebase';
import { Categoria } from '../../models/Categoria';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CategoriasService{
  private categoriasRef: firebase.database.Reference;

  constructor(public api: Api, public userService: UserService, public db: AngularFireDatabase) {
    this.categoriasRef = firebase.database().ref('categorias');
  }

  getAll(userId): Observable<Categoria[]> {
    return this.db.list<Categoria>(this.categoriasRef, ref => ref.orderByChild('idNegocio').equalTo(userId)).valueChanges();
  }

  public add(categoria: Categoria): Promise<any> {
    return this.userService.getCurrentUser().then((user) => {
      categoria.idNegocio = user.uid;
      categoria.id = this.categoriasRef.push().key;
      return this.categoriasRef.child(categoria.id).set(categoria);
    })
  }

  delete(item: Item) {
  }

}