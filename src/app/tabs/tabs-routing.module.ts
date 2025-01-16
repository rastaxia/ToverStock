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
        path: 'insights',
        loadChildren: () => import('../pages/secure/locations/locations.module').then(m => m.LocationsModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../pages/secure/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'cards',
        loadChildren: () => import('../pages/secure/count/count.module').then(m => m.CountModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
