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
    redirectTo: 'home',
    pathMatch: 'full',
    data: { title: 'Home' }
  },
  {
    path: 'producten',
    loadChildren: () => import('./producten/producten.module').then( m => m.ProductenPageModule),
    data : { title: 'Producten' }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    data: { title: 'Login' }
  },
  {
    path: 'telling',
    loadChildren: () => import('./telling/telling.module').then( m => m.TellingPageModule),
    data: { title: 'Telling' }
  },
  {
    path: 'locaties',
    loadChildren: () => import('./locaties/locaties.module').then( m => m.LocatiesPageModule),
    data: { title: 'Locaties' }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
