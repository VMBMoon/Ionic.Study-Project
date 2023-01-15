import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllSalesPageRoutingModule } from './all-sales-routing.module';

import { AllSalesPage } from './all-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSalesPageRoutingModule
  ],
  declarations: [AllSalesPage]
})
export class AllSalesPageModule {}
