import { Injectable } from '@angular/core';

import { Item } from '../../models/Item';
import { Api } from '../api/api';

import firebase from 'firebase';

@Injectable()
export class ItemsService {
  private itemsRef: firebase.database.Reference;

  constructor(public api: Api) {
    this.itemsRef = firebase.database().ref('items');
  }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  public add(item: Item): Promise<any> {
    let itemId = this.itemsRef.push().key;
    item.id = itemId;
    return this.itemsRef.child(itemId).set(item);
  }

  delete(item: Item) {
  }

}
