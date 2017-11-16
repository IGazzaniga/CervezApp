import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
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

  add(item: Item): firebase.database.ThenableReference {
    return this.itemsRef.push(item);
  }

  delete(item: Item) {
  }

}
