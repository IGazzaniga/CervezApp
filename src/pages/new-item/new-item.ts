import { Item } from '../../models/Item'
import { Component, ViewChild, QueryList, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsService } from "../../providers/items/items-service";
import { UserService } from "../../providers/user/user-service";
import { CategoriasService } from '../../providers/categorias/categorias-service';
import { NewItem } from '../../models/New-Item';
import { Categoria } from "../../models/Categoria";
import { LoadingProvider } from "../../providers/loading/loading";
import { Racion } from "../../models/Racion";

/**
 * Generated class for the NewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {
  @ViewChild('file0') file0;
  @ViewChild('file1') file1;
  @ViewChild('file2') file2;
  private filesFotos: File[] = [];
  private categoriaId: string;
  public newItemForm: any = {};
  public fotos = [];
  public categorias: Categoria[];
  public esCerveza: Boolean = false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemsService: ItemsService,
    public categoriasService: CategoriasService, public userService: UserService, public loadingService: LoadingProvider) {
  }

  ionViewDidLoad() {
    this.categoriaId = this.navParams.get('categoriaId');
    let racionInit = new Racion({nombre: '', precio: ''});
    this.newItemForm.raciones = [racionInit];
    this.newItemForm.fotos = [];
    this.newItemForm.stock = true;
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

  getPicture(event: Event, i:number) {
    event.preventDefault();
    if (i==0) {
      this.file0.nativeElement.click();
    }
    if (i==1) {
      this.file1.nativeElement.click();
    }
    if (i==2) {
      this.file2.nativeElement.click();
    }
  }

  processWebImage(event, index) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.fotos[index] = imageData;
    };
    this.filesFotos[index] = event.target.files[0];
    reader.readAsDataURL(this.filesFotos[index]);
  }

  public guardar() {
    this.loadingService.show();
    let newItem = new NewItem(this.newItemForm);
    this.itemsService.add(newItem, this.filesFotos, this.categoriaId).then((resp) => {
      this.loadingService.dissmis();
      this.navCtrl.pop();
    });
  }

  public addRacion (event) {
    event.preventDefault();
    this.newItemForm.raciones.push({nombre: '', precio: ''});
  }

  public removeRacion (index) {
    this.newItemForm.raciones.splice(index, 1);
  }

}
