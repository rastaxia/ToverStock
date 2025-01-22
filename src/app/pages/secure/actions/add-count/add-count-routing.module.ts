import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCountPage } from './add-count.page';

const routes: Routes = [
  {
    path: '',
    component: AddCountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCountPageRoutingModule {}
