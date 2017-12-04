import { Component, Input } from '@angular/core';
import { User } from "../../models/User";

/**
 * Generated class for the NegocioCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'negocio-card',
  templateUrl: 'negocio-card.html'
})
export class NegocioCardComponent {

  @Input("negocio") negocio: User;

  constructor() {
    console.log(this.negocio);
  }

}
