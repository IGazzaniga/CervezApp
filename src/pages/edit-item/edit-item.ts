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
  
  public validacion(currentItem: Item):boolean{
    let i : number = 0;
    
    if(!currentItem.nombre || currentItem.nombre.trim() === ""){
      alert("Falta completar el nombre del producto");
      this.loadingService.dissmis();
      return false;
    }
    else if(!currentItem.descripcion || currentItem.nombre.trim() === ""){
      alert("Falta completar la descripción del producto");
      this.loadingService.dissmis();
      return false;
    }
    else if (currentItem.esCerveza && (!currentItem.graduacion || currentItem.graduacion.toString() === "")) {
      alert("Falta completar la graduación de la cerveza");
      this.loadingService.dissmis();
      return false;
    }
    else if (currentItem.esCerveza && (!currentItem.tipo || currentItem.tipo.trim() === "")) {
      alert("Falta completar el tipo de la cerveza");
      this.loadingService.dissmis();
      return false;
    }
    else if (currentItem.esCerveza && (currentItem.graduacion > 100 || currentItem.graduacion < 0)) {
      alert("La graduación debe ser un valor entre 0 y 100");
      this.loadingService.dissmis();
      return false;
    }
    else if(currentItem.esCerveza &&(!currentItem.ibu || currentItem.ibu.toString() === "")){
      alert("Falta completar el IBU de la cerveza");
      this.loadingService.dissmis();
      return false;
    }
    else if(currentItem.esCerveza && (currentItem.ibu > 100 || currentItem.ibu < 0)){
      alert("El IBU debe ser un valor entre 0 y 100");
      this.loadingService.dissmis();
      return false
    }
    else if((currentItem.esCerveza && !currentItem.proveedor || currentItem.proveedor.trim() === "")){
      alert("Debe completar el proveedor de la cerveza");
      this.loadingService.dissmis();
      return false;
    }
    else if(currentItem.raciones.length !== 0){
      for(i=0; i < currentItem.raciones.length; i++){
        if (!currentItem.raciones[i].nombre || currentItem.raciones[i].nombre.trim() === ""){
          alert("Falta completar el nombre de la ración "+ [i+1]);
          this.loadingService.dissmis();
          return false;
        }
        else if(!currentItem.raciones[i].medida || currentItem.raciones[i].medida.toString() === ""){
          alert("Falta completar la medida de la ración "+ [i+1]);
          this.loadingService.dissmis();
          return false;
        }
        else if(isNaN(currentItem.raciones[i].medida)){
          alert("El campo medida de la ración "+ [i+1] +" debe ser un número");
          this.loadingService.dissmis();
          return false;
        }
        else if(!currentItem.raciones[i].unidad || currentItem.raciones[i].unidad.trim() === ""){
          alert("Falta completar la unidad de la ración "+ [i+1]);
          this.loadingService.dissmis();
          return false;
        }
        else if(currentItem.raciones[i].precio.toString() === ""){
          alert("Falta completar el precio de la ración "+ [i+1]);
          this.loadingService.dissmis();
          return false;
        }
        else if(isNaN(currentItem.raciones[i].precio)){
          alert("El campo precio de la ración "+ [i+1] +" debe ser un número");
          this.loadingService.dissmis();
          return false;
        }
        else{
        }
      }
      
    }
      
    return true;
  }            

  public editItem() {
    this.loadingService.show();
    let cond = this.validacion(this.currentItem);
    if(cond){
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

}
