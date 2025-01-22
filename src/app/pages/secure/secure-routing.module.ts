import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./../../tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'add-count',
    loadChildren: () => import('./actions/add-count/add-count.module').then( m => m.AddCountPageModule)
  },
  {
    path: 'add-stock',
    loadChildren: () => import('./actions/add-stock/add-stock.module').then( m => m.AddStockPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./actions/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'add-fraction',
    loadChildren: () => import('./actions/add-fraction/add-fraction.module').then( m => m.AddFractionPageModule)
  },
  {
    path: 'change-location',
    loadChildren: () => import('./actions/change-location/change-location.module').then( m => m.ChangeLocationPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
