import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LocatiesComponent } from './locaties/locaties.component';
import { ProductenComponent } from './producten/producten.component';
import { TellingComponent } from './telling/telling.component';

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
    path: 'locaties',
    component: LocatiesComponent,
    data: { title: 'Locaties' }
  },
  {
    path: 'producten',
    component: ProductenComponent,
    data: { title: 'Producten' }
  },
  {
    path: 'telling',
    component: TellingComponent,
    data: { title: 'Telling' }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
