import { Firestore } from '@angular/fire/firestore';
import { ProductService } from './../services/product.service';
import { Product } from './../model/product';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalProductDetailsComponent } from '../modal-product-details/modal-product-details.component';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  product!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private firestore: Firestore,
    private firebaseService: FirebaseService, private router: Router) {
      this.product = this.firebaseService.list();}

  public ionViewWillEnter(): void {
    this.firebaseService.list();
  }

  /*listProduct() {
    this.productService.getProduct().subscribe({
      next: (result) => (this.product = result),
      error: (err) => console.error(err),
    });
  }*/

  async openModal(id:string) {

    const product = this.firebaseService.find(`${id}`);

    const modal = await this.modalCtrl.create({
      component: ModalProductDetailsComponent,
      componentProps: {
        'product': product
      }
    });

    modal.onWillDismiss().then(
      event => {
        if(event.role === 'cancel') {
          this.firebaseService.list();
        }
      }
    );

    return await modal.present();
  }

}

