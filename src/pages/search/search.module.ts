import {NegocioCardComponentModule} from '../../components/negocio-card/negocio-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { GoogleplaceDirective } from "../../components/google-place-autocomplete/google-place.directive";
import { GooglePlaceComponentModule } from "../../components/google-place-autocomplete/google-place.module";

@NgModule({
  declarations: [
    SearchPage
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    NegocioCardComponentModule,
    GooglePlaceComponentModule
  ]
})
export class SearchPageModule {}
