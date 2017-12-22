import {NegocioCardComponentModule} from '../../components/negocio-card/negocio-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    NegocioCardComponentModule
  ],
})
export class SearchPageModule {}
