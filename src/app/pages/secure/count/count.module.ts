import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountRoutingModule } from './count-routing.module';

import { CountPage } from './count.page';

// Swiper
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountRoutingModule,
    SwiperModule
  ],
  declarations: [CountPage]
})
export class CountModule {}
