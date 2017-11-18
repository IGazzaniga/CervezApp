import { Injectable } from '@angular/core';

import { Item } from '../../models/Item';
import { Api } from '../api/api';

import firebase from 'firebase';
import { Categoria } from '../../models/Categoria';
import { UserService } from '../providers';

@Injectable()
export class CategoriasService{
  private categoriasRef: firebase.database.Reference;

  constructor(public api: Api, public userService: UserService) {
    this.categoriasRef = firebase.database().ref('categorias');
  }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(categoria: Categoria): firebase.database.ThenableReference {
    categoria.$idNegocio = this.userService._user.$uid;
    return this.categoriasRef.push(categoria);
  }

  delete(item: Item) {
  }

}