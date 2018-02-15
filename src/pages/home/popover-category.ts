import { Component } from "@angular/core";
import { AlertController, ViewController, NavController, NavParams } from 'ionic-angular';
import { CategoriasService } from "../../providers/categorias/categorias-service";
import { LoadingProvider } from "../../providers/loading/loading";
import { Categoria } from "../../models/Categoria";

@Component({
  selector: 'page-popover-category',
  template: `
    <ion-list no-lines no-margin>
      <button ion-item (click)="editCategory()">Editar</button>
      <button ion-item (click)="deleteCategory()">Borrar</button>
    </ion-list>
  `
})
export class PopoverCategoryPage {
    currentCategory: Categoria;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,
                public categoriasService: CategoriasService,public alertCtrl: AlertController, public loadingService: LoadingProvider) {
    this.currentCategory = this.navParams.get('cat');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  public deleteCategory () {
    this.close() 
    let prompt = this.alertCtrl.create({
      title: '',
      message: '¿Desea eliminar la categoría? <br> Se eliminaran todos los productos asociados a esta categoria.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.loadingService.show();
            this.categoriasService.delete(this.currentCategory.id).then(()=> { 
              this.loadingService.dissmis();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  public editCategory (){
    var copy = Object.assign({}, this.currentCategory);
    this.navCtrl.push('EditCategoryPage', {'currentCategory': copy});
    this.close();
  }
}