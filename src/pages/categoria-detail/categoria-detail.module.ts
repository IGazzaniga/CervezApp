import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaDetailPage } from './categoria-detail';

@NgModule({
  declarations: [
    CategoriaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaDetailPage),
  ],
})
export class CategoriaDetailPageModule {}
