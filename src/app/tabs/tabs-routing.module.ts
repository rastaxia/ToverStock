import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/secure/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'locations',
        loadChildren: () => import('../pages/secure/locations/locations.module').then(m => m.LocationsPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../pages/secure/products/products.module').then(m => m.ProductsPageModule)
      },
      {
        path: 'count',
        loadChildren: () => import('../pages/secure/count/count.module').then(m => m.CountPageModule)
      },
      {
        path: 'actions',
        loadChildren: () => import('../pages/secure/actions/actions.module').then( m => m.ActionsPageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
