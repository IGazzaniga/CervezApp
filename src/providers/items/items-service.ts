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

  constructor(public api: Api, public categoriasService: CategoriasService, public db: AngularFireDatabase) {
    this.itemsRef = firebase.database().ref('items');
  }


  getAll(categoriaId): Observable<Item[]> {
    return this.db.list<Item>(this.itemsRef, ref => ref.orderByChild('idCategoria').equalTo(categoriaId)).valueChanges();
  }

  public add(newitem: NewItem): Promise<any> {
      let item = new Item(newitem);
      item.id = this.itemsRef.push().key;
      return this.itemsRef.child(item.id).set(item);
  }
  
  public delete (itemId: string): Promise<any> {
    return this.itemsRef.child(itemId).remove();
  }


}
