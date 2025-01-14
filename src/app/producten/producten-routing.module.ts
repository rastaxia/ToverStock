import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductenPage } from './producten.page';

const routes: Routes = [
  {
    path: '',
    component: ProductenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductenPageRoutingModule {}
