import {IonicModule} from 'ionic-angular';
import { NgModule } from '@angular/core';
import { NegocioCardComponent } from "./negocio-card";

@NgModule({
  imports: [
      IonicModule
  ],
  declarations: [
    NegocioCardComponent
  ],
  exports: [
    NegocioCardComponent
  ]
})
export class NegocioCardComponentModule {}