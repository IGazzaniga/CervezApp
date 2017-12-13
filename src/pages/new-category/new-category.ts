import {Categoria} from '../../models/Categoria';
import { Component, ViewChild } from '@angular/core';
import {ActionSheetController, IonicPage,  NavController,  NavParams} from 'ionic-angular';
import { CategoriasService } from "../../providers/categorias/categorias-service";
import { UserService } from "../../providers/user/user-service";
import { NewCategoria } from "../../models/New-Categoria";
import { LoadingProvider } from "../../providers/loading/loading";

/**
 * Generated class for the NewCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-category',
  templateUrl: 'new-category.html',
})
export class NewCategoryPage {
  @ViewChild('fileInput') fileInput;
  public newCategoryForm: any = {};
  private fileFoto: File;
  public selectOptions:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public categoriasService: CategoriasService, public userService: UserService, 
              public loadingService: LoadingProvider, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.selectOptions = {
      title: 'Pizza Toppings',
      subTitle: 'Select your toppings',
      mode: 'md'
    };
  }

  ionViewCanEnter(): boolean{
    //solo se puede entrar al login cuando no hay un usuario logueado
    if(this.userService.isUserAuth()){
        return true;
      } else {
        this.navCtrl.setRoot('MainPage');
        return false;
      }
  }

  getPicture(event: Event) {
    event.preventDefault();
    this.fileInput.nativeElement.click();
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.newCategoryForm.imagen = imageData;
    };
    this.fileFoto = event.target.files[0];
    reader.readAsDataURL(this.fileFoto);
  }

  public guardar() {
    this.loadingService.show();
    let newCategoria = new NewCategoria(this.newCategoryForm);
    this.categoriasService.add(newCategoria, this.fileFoto).then((resp) => {
      this.loadingService.dissmis();
      this.navCtrl.pop();
    });
  }

}
