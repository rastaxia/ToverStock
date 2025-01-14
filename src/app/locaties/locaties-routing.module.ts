import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocatiesPage } from './locaties.page';

const routes: Routes = [
  {
    path: '',
    component: LocatiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocatiesPageRoutingModule {}
