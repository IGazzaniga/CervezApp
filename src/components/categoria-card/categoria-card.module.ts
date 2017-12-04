import {IonicModule} from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CategoriaCardComponent } from "./categoria-card";

@NgModule({
  imports: [
      IonicModule
  ],
  declarations: [
    CategoriaCardComponent
  ],
  exports: [
    CategoriaCardComponent
  ]
})
export class CategoriaCardComponentModule {}