import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NegocioMainPage } from './negocio-main';

@NgModule({
  declarations: [
    NegocioMainPage,
  ],
  imports: [
    IonicPageModule.forChild(NegocioMainPage),
  ],
})
export class NegocioMainPageModule {}
