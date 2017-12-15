import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { GoogleplaceDirective } from "../../components/google-place-autocomplete/google-place.directive";

@NgModule({
  declarations: [
    ProfilePage,
    GoogleplaceDirective
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
  exports: [GoogleplaceDirective]
})
export class ProfilePageModule {}
