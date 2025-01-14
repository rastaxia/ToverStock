import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TellingPageRoutingModule } from './telling-routing.module';

import { TellingPage } from './telling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TellingPageRoutingModule
  ],
  declarations: [TellingPage]
})
export class TellingPageModule {}
