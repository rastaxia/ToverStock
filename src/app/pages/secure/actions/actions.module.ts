import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionsPageRoutingModule } from './actions-routing.module';
import { ActionsPage } from './actions.page';
import { AddCountComponent } from './executables/add-count/add-count.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ActionsPageRoutingModule
  ],
  declarations: [
    ActionsPage,
    AddCountComponent
  ]
})
export class ActionsPageModule {}
