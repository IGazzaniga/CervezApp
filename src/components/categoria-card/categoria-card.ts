import { Component, Input } from '@angular/core';
import { Categoria } from "../../models/Categoria";

/**
 * Generated class for the CategoriaCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'categoria-card',
  templateUrl: 'categoria-card.html'
})
export class CategoriaCardComponent {

  @Input("categoria") categoria: Categoria;

  constructor() {
    console.log('Hello CategoriaCardComponent Component');
  }

}
