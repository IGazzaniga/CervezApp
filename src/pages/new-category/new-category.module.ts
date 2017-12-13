import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCategoryPage } from './new-category';

@NgModule({
  declarations: [
    NewCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCategoryPage),
  ],
})
export class NewCategoryPageModule {}
