import { Endereco } from './../model/endereco';
import { Fornecedor } from './../model/fornecedor';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-modal-fornecedor-details',
  templateUrl: './modal-fornecedor-details.component.html',
  styleUrls: ['./modal-fornecedor-details.component.scss'],
})
export class ModalFornecedorDetailsComponent implements OnInit {

  @Input() fornecedor!: Fornecedor;
  @Input() endereco!: Endereco;


  constructor(
    private modalCtrl: ModalController,
    private fornecedorService: FornecedorService,
    private router: Router
  ) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

  edit(id: number) {
    this.router.navigate(['/tabs/editar_forn', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id: number) {
    this.fornecedorService.deleteFornecedor(id).subscribe({
      next: () => {
        this.modalCtrl.dismiss(null, 'cancel');
      },
      error: () => {
        console.error(console.error);
      },
    });
  }


}
