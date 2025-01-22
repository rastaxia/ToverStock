import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCountPageRoutingModule } from './add-count-routing.module';

import { AddCountPage } from './add-count.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCountPageRoutingModule
  ],
  declarations: [AddCountPage]
})
export class AddCountPageModule {}
