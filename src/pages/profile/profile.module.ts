import { NgModule} from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { ProfilePage } from './profile';
import { GoogleplaceDirective } from "../../components/google-place-autocomplete/google-place.directive";
import { GooglePlaceComponentModule } from "../../components/google-place-autocomplete/google-place.module";

@NgModule({
  declarations: [
    ProfilePage
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    GooglePlaceComponentModule
  ]
})
export class ProfilePageModule {}
