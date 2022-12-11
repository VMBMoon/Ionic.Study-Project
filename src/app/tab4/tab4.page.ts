import { Endereco } from './../model/endereco';
import { FornecedorService } from './../services/fornecedor.service';
import { Fornecedor } from './../model/fornecedor';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFornecedorDetailsComponent } from '../modal-fornecedor-details/modal-fornecedor-details.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  fornecedor!: Fornecedor[];
  endereco!: Endereco[];


  constructor(
    private fornecedorService: FornecedorService,
    private modalCtrl: ModalController
  ) { }

  public ionViewWillEnter(): void {
    this.listFornecedor();
  }

  listFornecedor() {
    this.fornecedorService.getFornecedor().subscribe({
      next: (result) => (this.fornecedor = result),
      error: (err) => console.error(err),
    });
  }

  async openModal(id:number) {

    const fornecedor = this.fornecedor.find(fornecedor => fornecedor.id === id);
    const endereco = this.fornecedor.find(fornecedor => fornecedor.id === id);


    const modal = await this.modalCtrl.create({
      component: ModalFornecedorDetailsComponent,
      componentProps: {
        'fornecedor': fornecedor,
        'endereco' : endereco,
      }
    });

    modal.onWillDismiss().then(
      event => {
        if(event.role === 'cancel') {
          this.listFornecedor();
        }
      }
    );

    return await modal.present();
  }

}
