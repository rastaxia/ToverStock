import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionsPageRoutingModule } from './actions-routing.module';
import { ActionsPage } from './actions.page';
import { AddCountComponent } from './executables/add-count/add-count.component';
import { AddDeliveryComponent } from './executables/add-delivery/add-delivery.component';
import { AddFractionComponent } from './executables/add-fraction/add-fraction.component';
import { MoveProductComponent } from './executables/move-product/move-product.component';


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
    AddCountComponent,
    AddDeliveryComponent,
    AddFractionComponent,
    MoveProductComponent
    
  ]
})
export class ActionsPageModule {}
