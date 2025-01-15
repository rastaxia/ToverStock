import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
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
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule),
    data : { title: 'Products' }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    data: { title: 'Login', hideMenu: true }
  },
  {
    path: 'count',
    loadChildren: () => import('./count/count.module').then( m => m.CountModule),
    data: { title: 'Count' }
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then( m => m.LocationsModule),
    data: { title: 'locations' }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
