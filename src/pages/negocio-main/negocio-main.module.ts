import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NegocioMainPage } from './negocio-main';
import { CategoriaCardComponentModule } from "../../components/categoria-card/categoria-card.module";

@NgModule({
  declarations: [
    NegocioMainPage,
  ],
  imports: [
    CategoriaCardComponentModule,
    IonicPageModule.forChild(NegocioMainPage),
  ],
})
export class NegocioMainPageModule {}
