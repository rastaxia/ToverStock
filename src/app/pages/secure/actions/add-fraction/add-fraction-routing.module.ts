import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFractionPage } from './add-fraction.page';

const routes: Routes = [
  {
    path: '',
    component: AddFractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFractionPageRoutingModule {}
