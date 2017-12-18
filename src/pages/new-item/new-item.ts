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
  
  public validacion(newItem: NewItem):boolean{
    let i : number = 0;
    
    if(!newItem.nombre || newItem.nombre.trim() === ""){
      alert("Falta completar el nombre del producto");
      this.loadingService.dissmis();
      return false;
    }
    else if(!newItem.descripcion || newItem.nombre.trim() === ""){
      alert("Falta completar la descripción del producto");
      this.loadingService.dissmis();
      return false;
    }
    else if (this.esCerveza && (!newItem.tipo || newItem.tipo.trim() === "")) {
      alert("Falta completar el tipo de la cerveza");
      this.loadingService.dissmis();
      return false;
    }
    else if (this.esCerveza && (!newItem.graduacion || newItem.graduacion.toString() === "")) {
      alert("Falta completar la graduación de la cerveza");
      this.loadingService.dissmis();
      return false;
    }
    else if(this.esCerveza &&(newItem.graduacion > 100 || newItem.graduacion < 0)){
      alert("La graduación debe ser un valor entre 0 y 100");
      this.loadingService.dissmis();
      return false
    }
    else if(this.esCerveza &&(!newItem.ibu || newItem.ibu.toString() === "")){
      alert("Falta completar el IBU de la cerveza");
      this.loadingService.dissmis();
      return false;
    }
    else if(this.esCerveza && (newItem.ibu > 100 || newItem.ibu < 0)){
      alert("El IBU debe ser un valor entre 0 y 100");
      this.loadingService.dissmis();
      return false
    }
    else if((this.esCerveza && !newItem.proveedor || newItem.proveedor.trim() === "")){
      alert("Debe completar el proveedor de la cerveza");
      this.loadingService.dissmis();
      return false;
    }
    else if(newItem.raciones.length !== 0){
      for(i=0; i < newItem.raciones.length; i++){
        if (!newItem.raciones[i].nombre || newItem.raciones[i].nombre.trim() === ""){
          alert("Falta completar el nombre de la ración "+ [i+1]);
          this.loadingService.dissmis();
          return false;
        }
        else if(!newItem.raciones[i].medida || newItem.raciones[i].medida.toString() === ""){
          alert("Falta completar la medida de la ración "+ [i+1]);
          this.loadingService.dissmis();
          return false;
        }
        else if(isNaN(newItem.raciones[i].medida)){
          alert("El campo medida de la ración "+ [i+1] +" debe ser un número");
          this.loadingService.dissmis();
          return false;
        }
        else if(!newItem.raciones[i].unidad || newItem.raciones[i].unidad.trim() === ""){
          alert("Falta completar la unidad de la ración "+ [i+1]);
          this.loadingService.dissmis();
          return false;
        }
        else if(newItem.raciones[i].precio.toString() === ""){
          alert("Falta completar el precio de la ración "+ [i+1]);
          this.loadingService.dissmis();
          return false;
        }
        else if(isNaN(newItem.raciones[i].precio)){
          alert("El campo precio de la ración "+ [i+1] +" debe ser un número");
          this.loadingService.dissmis();
          return false;
        }
        else{}
      }
    }  
    return true;
  }   
    
                    
    
  public guardar() {
    this.loadingService.show();
    let newItem = new NewItem(this.newItemForm);
    let cond = this.validacion(newItem);
    if(cond){
      this.itemsService.add(newItem, this.filesFotos, this.categoriaId).then((resp) => {
        this.loadingService.dissmis();
        this.navCtrl.pop();
      });
      alert("Producto cargado");
    }
  }

  public addRacion (event) {
    event.preventDefault();
    this.newItemForm.raciones.push({nombre: '', precio: '', medida: '', unidad: ''});
  }

  public removeRacion (index) {
    this.newItemForm.raciones.splice(index, 1);
  }

}
