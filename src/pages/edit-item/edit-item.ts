import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { Categoria } from '../../models/Categoria';
import { UserService } from '../../providers/user/user-service';
import { LoadingProvider } from '../../providers/loading/loading';
import { CategoriasService } from '../../providers/categorias/categorias-service';
import { ItemsService } from '../../providers/items/items-service';
import { Item } from '../../models/Item';
import { Racion } from '../../models/Racion';

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  index: any;
  @ViewChild('file0') file0;
  @ViewChild('file1') file1;
  @ViewChild('file2') file2;
  private filesFotos: File[] = [];
  public fotos = [];
  public currentUser: User;
  public currentItem: Item;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public loadingService: LoadingProvider,
    public categoriasService: CategoriasService,
    public itemsService: ItemsService) {
      this.currentItem = this.navParams.get('currentItem');     
  }

  ionViewDidLoad() {
  }

  ionViewCanEnter(): boolean {
    if (this.userService.isUserAuth() && this.currentItem){
      return true;
    } else {
      this.navCtrl.setRoot('HomePage');
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

  public addRacion (event) {
    event.preventDefault();
    this.currentItem.raciones.push(new Racion({nombre: '', medida: '', precio: '', unidad: ''}));
  }

  public removeRacion (index) {
    this.currentItem.raciones.splice(index, 1);
  }


 public editItem() {
    this.loadingService.show();
    this.itemsService.editItem(this.currentItem.id, this.currentItem, this.index, this.filesFotos[this.index])
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
