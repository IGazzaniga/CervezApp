import {CategoriasService} from '../categorias/categorias-service';
import { Injectable } from '@angular/core';

import { Item } from '../../models/Item';
import { Api } from '../api/api';

import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NewItem } from '../../models/New-Item';

@Injectable()
export class ItemsService {
  private itemsRef: firebase.database.Reference;
  private storageRef: firebase.storage.Reference;

  constructor(public api: Api, public db: AngularFireDatabase) {
    this.itemsRef = firebase.database().ref('items');
    this.storageRef = firebase.storage().ref();
  }


  getAll(categoriaId): Observable<Item[]> {
    return this.db.list<Item>(this.itemsRef, ref => ref.orderByChild('idCategoria').equalTo(categoriaId)).valueChanges();
  }

  public add(newitem: NewItem, fotos:File[], categoriaId: string): Promise<any> {
    let item = new Item(newitem);
    item.id = this.itemsRef.push().key;
    item.idCategoria = categoriaId;
    if (fotos.length > 0) {
      return this.saveMultipleImage(item.id, fotos).then((fotosURL) => {
        item.fotos = fotosURL;
        return this.itemsRef.child(item.id).set(item);
      })
    } else {
      return this.itemsRef.child(item.id).set(item);
    }
  }

  public saveMultipleImage (idItem: string, fotos: File[]): Promise<string[]> {
    let fotosURL:string[] = []
    return new Promise((resolve, reject) => {
      for (var index = 0; index < fotos.length; index++) {
        var foto = fotos[index];
        this.saveImage(idItem, index, foto).then((snap) => {
          fotosURL.push(snap.downloadURL);
          if (fotosURL.length == fotos.length) {
            resolve(fotosURL);
          }
        });
      }
    });
  }

  public saveImage (idItem:string, index:number, foto: File) {
    return this.storageRef.child(`items-images/${idItem}/${index}.jpg`).put(foto);
  }

  public editItem(itemId:string, editItem: any, index:number, imagen:File): Promise<any> {
    if (imagen) {
      return this.saveImage(itemId, index, imagen).then((snap) => {
        editItem.imagen = snap.downloadURL;
        return this.itemsRef.child(itemId).update(editItem);
      })
    } else {
        return this.itemsRef.child(itemId).update(editItem);
    }
  }
  
  
  public delete (itemId: string): Promise<any> {
    return this.itemsRef.child(itemId).remove();
  }

  public deleteAllByCategoriaId(categoriaId: string): Promise<any> {
    return this.itemsRef.orderByChild('idCategoria').equalTo(categoriaId).once('value', snapshot => {
     let updates = {};
     snapshot.forEach(child => updates[child.key] = null);
     this.itemsRef.update(updates);
    });
  }

  public getRaciones (): Observable<string[]> {
    return this.db.list<string>('raciones').valueChanges();
  }

}
