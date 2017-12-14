import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/User';
import { UserService } from '../../providers/user/user-service';
import { CategoriasService } from '../../providers/categorias/categorias-service';
import { LoadingProvider } from '../../providers/loading/loading';
import { NewCategoria } from '../../models/New-Categoria';
import { Categoria } from '../../models/Categoria';

/**
 * Generated class for the EditCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {
  @ViewChild('fileInput') fileInput;
  public currentUser: User;
  public currentCategory: Categoria;
  private fileFoto: File;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public loadingService: LoadingProvider,
    public categoriasService: CategoriasService) {
      this.currentCategory = this.navParams.get('currentCategory');     
  }

  ionViewDidLoad() {
  }

  ionViewCanEnter(): boolean {
    if (this.userService.isUserAuth() && this.currentCategory){
      return true;
    } else {
      this.navCtrl.setRoot('HomePage');
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
      this.currentCategory.imagen = imageData;
    };
    this.fileFoto = event.target.files[0];
    reader.readAsDataURL(this.fileFoto);
  }

 public editCategory() {
    this.loadingService.show();
    this.categoriasService.editCategory(this.currentCategory.id, this.currentCategory, this.fileFoto)
    .then((data) => {
        this.loadingService.dissmis();
        this.navCtrl.pop();
    })
    .catch((e:Error) => {
        alert("Error al editar la categoria");
        this.loadingService.dissmis();
        this.navCtrl.pop();
    });   
  }


}
