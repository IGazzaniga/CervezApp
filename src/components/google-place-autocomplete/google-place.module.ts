import { GoogleplaceDirective } from "./google-place.directive";
import { IonicModule } from "ionic-angular";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
      IonicModule
  ],
  declarations: [
    GoogleplaceDirective
  ],
  exports: [
    GoogleplaceDirective
  ]
})
export class GooglePlaceComponentModule {}