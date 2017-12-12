import {ItemsService} from '../items/items-service';
import {UserService} from '../user/user-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import { Item } from '../../models/Item';
import { Api } from '../api/api';

import firebase from 'firebase';
import { Categoria } from '../../models/Categoria';
import { Observable } from "rxjs/Observable";
import { NewCategoria } from "../../models/New-Categoria";

@Injectable()
export class CategoriasService{
  private categoriasRef: firebase.database.Reference;
  private storageRef: firebase.storage.Reference;

  constructor(public api: Api, public userService: UserService, public db: AngularFireDatabase, public itemsService: ItemsService) {
    this.categoriasRef = firebase.database().ref('categorias');
    this.storageRef = firebase.storage().ref();
  }

  getAll(userId): Observable<Categoria[]> {
    return this.db.list<Categoria>(this.categoriasRef, ref => ref.orderByChild('idNegocio').equalTo(userId)).valueChanges();
  }

  public add(newcategoria: NewCategoria, imagen: File): Promise<any> {
    let categoria = new Categoria(newcategoria);
    if (imagen) {
      return this.userService.getCurrentUser().then((user) => {
        categoria.idNegocio = user.uid;
        categoria.id = this.categoriasRef.push().key;
        return this.saveImage(categoria.id, imagen).then((snap) => {
          categoria.imagen = snap.downloadURL;
          return this.categoriasRef.child(categoria.id).set(categoria);
        })
      })
    } else {
      return this.userService.getCurrentUser().then((user) => {
        categoria.idNegocio = user.uid;
        categoria.id = this.categoriasRef.push().key;
        return this.categoriasRef.child(categoria.id).set(categoria);
      })
    }
  }

  public delete (catId: string): Promise<any> {
    return this.categoriasRef.child(catId).remove().then(() => {
      return this.itemsService.deleteAllByCategoriaId(catId);
    });
  }

  public saveImage (idCat:string, foto: File) {
    return this.storageRef.child(`categoria-images/${idCat}.jpg`).put(foto);
  }

}