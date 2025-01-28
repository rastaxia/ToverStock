import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./actions/actions.module').then( m => m.ActionsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
