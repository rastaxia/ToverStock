import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFractionPageRoutingModule } from './add-fraction-routing.module';

import { AddFractionPage } from './add-fraction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFractionPageRoutingModule
  ],
  declarations: [AddFractionPage]
})
export class AddFractionPageModule {}
