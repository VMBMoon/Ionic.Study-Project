import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFornecedorDetailsComponent } from './modal-fornecedor-details.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ModalFornecedorDetailsComponent],
  imports: [CommonModule, IonicModule],
  exports: [ModalFornecedorDetailsComponent]
})
export class ModalFornecedorDetailsModule { }
