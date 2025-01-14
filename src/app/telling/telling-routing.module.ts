import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TellingPage } from './telling.page';

const routes: Routes = [
  {
    path: '',
    component: TellingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TellingPageRoutingModule {}
