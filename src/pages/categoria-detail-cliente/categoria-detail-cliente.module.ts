import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaDetailClientePage } from './categoria-detail-cliente';

@NgModule({
  declarations: [
    CategoriaDetailClientePage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaDetailClientePage),
  ],
})
export class CategoriaDetailClientePageModule {}
