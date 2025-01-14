import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocatiesPageRoutingModule } from './locaties-routing.module';

import { LocatiesPage } from './locaties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocatiesPageRoutingModule
  ],
  declarations: [LocatiesPage]
})
export class LocatiesPageModule {}
