import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    data: { title: 'Home' }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    data: { title: 'Login', hideMenu: true }
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsModule),
    data : { title: 'Products' }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    data: { title: 'Login', hideMenu: true }
  },
  {
    path: 'count',
    loadChildren: () => import('./pages/count/count.module').then( m => m.CountModule),
    data: { title: 'Count' }
  },
  {
    path: 'locations',
    loadChildren: () => import('./pages/locations/locations.module').then( m => m.LocationsModule),
    data: { title: 'locations' }
  },
  {
    path: 'actions',
    loadChildren: () => import('./pages/actions/actions.module').then( m => m.ActionsPageModule),
    data: { title: 'Actions' }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
