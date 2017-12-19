import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import { NegocioCardComponentModule } from "../../components/negocio-card/negocio-card.module";

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    NegocioCardComponentModule
  ],
})
export class MainPageModule {}
