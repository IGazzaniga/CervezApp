import {NegocioCardComponentModule} from '../../components/negocio-card/negocio-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { GoogleplaceDirective } from "../../components/google-place-autocomplete/google-place.directive";

@NgModule({
  declarations: [
    SearchPage,
    GoogleplaceDirective
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    NegocioCardComponentModule
  ],
  exports: [GoogleplaceDirective]
})
export class SearchPageModule {}
