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
    public categoriasService: CategoriasService,
    public actionSheetCtrl: ActionSheetController) {
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

  public presentUserPhotoActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Modificar imagen',
          icon:'images',
          handler: () => {
            this.fileInput.nativeElement.click();
          }
        },{
          text: 'Ver imagen',
          icon: 'camera',
          handler: () => {
            window.open(this.currentCategory.imagen);
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          icon: 'close',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
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
 
  public validacion(currentCategory: Categoria):boolean{
    if(!currentCategory.nombre || currentCategory.nombre.trim() === ""){
      alert("Falta completar el nombre de la categoría");
      this.loadingService.dissmis();
      return false;
    }
      else if(!currentCategory.imagen){
        alert("Falta agregar una imagen a la categoría");
        this.loadingService.dissmis();
        return false;
      }
      else if(this.fileFoto.size > 2097152){
        alert("Debe incluir una foto que no sea mayor a 2MB");
        this.loadingService.dissmis();
        return false;
      }
      else if(!currentCategory.icono){
        alert("Falta asignar un ícono a la categoría");
        this.loadingService.dissmis();
        return false;
      }
      else{
        return true;
      }

  } 

  public editCategory() {
    this.loadingService.show();
    let cond = this.validacion(this.currentCategory);
    if(cond){
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

}
