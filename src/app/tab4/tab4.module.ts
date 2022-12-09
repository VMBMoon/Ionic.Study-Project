import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { ModalFornecedorDetailsModule } from '../modal-fornecedor-details/modal-fornecedor-details.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FornecedorService } from '../services/fornecedor.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    ExploreContainerComponentModule,
    HttpClientModule,
    ModalFornecedorDetailsModule

  ],
  declarations: [Tab4Page],
  providers: [FornecedorService]
})
export class Tab4PageModule {}
