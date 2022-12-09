import { ProductService } from './../services/product.service';
import { Product } from './../model/product';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalProductDetailsComponent } from '../modal-product-details/modal-product-details.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  product!: Product[];

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController ) {}

  public ionViewWillEnter(): void {
    this.listProduct();
  }

  listProduct() {
    this.productService.getProduct().subscribe({
      next: (result) => (this.product = result),
      error: (err) => console.error(err),
    });
  }

  async openModal(id:number) {

    const product = this.product.find(product => product.id === id);


    const modal = await this.modalCtrl.create({
      component: ModalProductDetailsComponent,
      componentProps: {
        'product': product
      }
    });

    modal.onWillDismiss().then(
      event => {
        if(event.role === 'cancel') {
          this.listProduct();
        }
      }
    );

    return await modal.present();
  }

}
