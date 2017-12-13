import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/User';
import { UserService } from '../../providers/user/user-service';
import { CategoriasService } from '../../providers/categorias/categorias-service';
import { LoadingProvider } from '../../providers/loading/loading';
import { NewCategoria } from '../../models/New-Categoria';

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
  public currentCategory: any;
  public editCategoryForm: any = {};
  private spinner: any;
  private fileFoto: File;

  constructor(private loadingCtrl: LoadingController, 
  public viewCtrl: ViewController,
  public navCtrl: NavController, 
  public navParams: NavParams,
  public formBuilder: FormBuilder,
  public userService: UserService,
  public categoriasService: CategoriasService,
  public loadingService: LoadingProvider, 
  
  public actionSheetCtrl: ActionSheetController) {
    this.currentCategory = this.navParams.get('currentCategory');
       
  }
  ionViewDidLoad() {
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
      this.editCategoryForm.imagen = imageData;
    };
    this.fileFoto = event.target.files[0];
    reader.readAsDataURL(this.fileFoto);
  }

 public editCategory(newCategoria: any) {
  if (newCategoria.name.trim()) {
      this.spinner.present();

      this.categoriasService.editCategory(this.currentCategory.$key, newCategoria)
      .then((data) => {
          this.spinner.dismiss();
          this.viewCtrl.dismiss(this.currentCategory, newCategoria);
      })
      .catch((e:Error) => {
          this.spinner.dismiss();
          this.viewCtrl.dismiss();
      });
      
  }
}


}
