import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductenPageRoutingModule } from './producten-routing.module';

import { ProductenPage } from './producten.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductenPageRoutingModule
  ],
  declarations: [ProductenPage]
})
export class ProductenPageModule {}
